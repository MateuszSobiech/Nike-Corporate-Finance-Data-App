"use client"

import { waterfallWorkingCapital } from "@/data/balance_sheet_data"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

interface WaterfallChartProps {
  selectedYear: number
}

const WaterfallWorkingCapital: React.FC<WaterfallChartProps> = ({
  selectedYear,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Filter data for the selected year
    const filteredData = waterfallWorkingCapital.filter(
      (item) => item.fiscal_year === selectedYear,
    )

    if (!filteredData.length) return

    const svg = d3.select(svgRef.current)

    // Clear previous chart
    svg.selectAll("*").remove()

    // Get container dimensions
    const containerWidth = svgRef.current.parentElement?.clientWidth || 800
    const margin = { top: 20, right: 30, bottom: 40, left: 80 }
    const width = containerWidth - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const chart = svg
      .attr("viewBox", `0 0 ${containerWidth} 400`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .style("font", "12px Inter, sans-serif")

    // Prepare data for waterfall chart
    const totalAssets = filteredData[0].total_current_assets
    const totalLiabilities = filteredData[0].total_current_liabilities
    const netWorkingCapital = totalAssets + totalLiabilities

    const data = [
      { category: "Total Current Assets", value: totalAssets, start: 0 },
      {
        category: "Total Current Liabilities",
        value: totalLiabilities,
        start: totalAssets,
      },
      {
        category: "Net Working Capital",
        value: netWorkingCapital,
        start: totalAssets + totalLiabilities,
      },
    ]

    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.4)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.start + d.value) || 0])
      .nice()
      .range([height, 0])

    // X-Axis
    const xAxis = d3.axisBottom(x).tickSize(0).tickPadding(12)
    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll(".tick text")
      .style("font", "12px Inter, sans-serif") // Apply font to X-axis tick labels
      .attr("class", "fill-gray-500 dark:fill-gray-500")

    chart
      .select(".x-axis .domain")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-width", 1)
      .attr("class", "stroke-gray-200 dark:stroke-gray-800")

    // Y-Axis
    const yAxis = d3
      .axisLeft(y)
      .tickSize(-width)
      .tickPadding(12)
      .ticks(4)
      .tickFormat((d) => {
        if (d >= 1e9) return `$${(d / 1e9).toFixed(1)}B`
        if (d >= 1e6) return `$${(d / 1e6).toFixed(1)}B`
        if (d >= 1e3) return `$${(d / 1e3).toFixed(1)}K`
        return d3.format(",.1f")(d)
      })

    chart
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll(".tick text")
      .style("font", "12px Inter, sans-serif") // Apply font to Y-axis tick labels
      .attr("class", "fill-gray-500 dark:fill-gray-500")

    chart.select(".y-axis .domain").attr("stroke", "none") // Remove Y-axis domain line

    chart
      .selectAll(".tick line")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-width", 1)
      .attr("class", "stroke-gray-200 dark:stroke-gray-800")

    // Bars
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.category)!)
      .attr("y", (d) =>
        d.category === "Net Working Capital"
          ? y(d.start)
          : y(Math.max(d.start, d.start + d.value)),
      )
      .attr("width", x.bandwidth())
      .attr("height", (d) =>
        d.category === "Net Working Capital"
          ? Math.abs(y(d.start) - y(0))
          : Math.abs(y(d.start) - y(d.start + d.value)),
      )
      .attr("fill", (d) =>
        d.category === "Net Working Capital"
          ? "#d1d5db"
          : d.value > 0
            ? "#059669"
            : "#ef4444",
      )

    // Dotted Lines (between bars)
    chart
      .selectAll(".dotted-line")
      .data(data.slice(0, -1))
      .enter()
      .append("line")
      .attr("class", "dotted-line")
      .attr("x1", (d) => x(d.category)! + x.bandwidth())
      .attr("y1", (d) => y(d.start + d.value))
      .attr("x2", (d, i) => x(data[i + 1].category)!)
      .attr("y2", (d, i) => y(data[i + 1].start))
      .attr("stroke", "#6b7280")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "1.5,1.5")

    // Label
    // svg
    //   .selectAll(".label")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .attr("class", "label")
    //   .attr("x", (d) => x(d.category)! + x.bandwidth() / 2)
    //   .attr("y", (d) =>
    //     d.category === "Net Working Capital"
    //       ? y(0) - 5
    //       : y(d.start + d.value) - 5,
    //   )
    //   .attr("text-anchor", "middle")
    //   .text((d) =>
    //     d.category === "Net Working Capital"
    //       ? d3.format(",")(Math.abs(d.value))
    //       : d3.format(",")(d.value),
    //   )
    //   .style("fill", "black")
  }, [selectedYear])

  return <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
}

export default WaterfallWorkingCapital

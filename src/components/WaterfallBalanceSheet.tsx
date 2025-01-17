"use client"

import { waterfallBalanceSheet } from "@/data/balance_sheet_data"
import * as d3 from "d3"
import { useEffect, useRef } from "react"

interface WaterfallChartProps {
  selectedYear: number
  categories: {
    name: string
    field: keyof (typeof waterfallBalanceSheet)[0]
  }[]
  dataset: typeof waterfallBalanceSheet
}

const WaterfallBalanceSheet: React.FC<WaterfallChartProps> = ({
  selectedYear,
  categories,
  dataset,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const filteredData = dataset.filter(
      (item) => item.fiscal_year === selectedYear,
    )

    if (filteredData.length === 0) {
      console.warn("No data found for selected year:", selectedYear)
      return
    }

    const svg = d3.select(svgRef.current)

    // Clear previous chart
    svg.selectAll("*").remove()

    // Get container dimensions
    const containerWidth = svgRef.current.parentElement?.clientWidth || 800
    const margin = { top: 30, right: 0, bottom: -60, left: 0 }
    const width = containerWidth - margin.left - margin.right
    const height = 200 - margin.top - margin.bottom

    const chart = svg
      .attr("viewBox", `0 0 ${containerWidth} 400`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .style("font", "12px Inter, sans-serif")

    // Calculate data for the chart based on the filtered dataset for the selected year
    const data = categories.reduce(
      (acc, category, index) => {
        const value = filteredData[0][category.field] as number
        const start =
          index === 0 ? 0 : acc[index - 1].start + acc[index - 1].value
        acc.push({ category: category.name, value, start })
        return acc
      },
      [] as { category: string; value: number; start: number }[],
    )

    // Find the maximum total_assets for the selected year
    const maxTotalAssets = d3.max(
      filteredData,
      (d) => d.total_assets as number,
    )!

    // Scales based on the max total_assets value
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.4)

    const y = d3.scaleLinear().domain([0, maxTotalAssets]).range([height, 0])

    // X-Axis
    const xAxis = d3.axisBottom(x).tickSize(0).tickPadding(12)
    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll(".tick text")
      .style("font", "14px Inter, sans-serif")
      .attr("class", "fill-gray-500 dark:fill-gray-500")

    chart
      .select(".x-axis .domain")
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
        d.category === "Working Capital" || d.category === "Total Equity"
          ? y(d.start)
          : y(Math.max(d.start, d.start + d.value)),
      )
      .attr("width", x.bandwidth())
      .attr("height", (d) =>
        d.category === "Working Capital" || d.category === "Total Equity"
          ? Math.abs(y(d.start) - y(0))
          : Math.abs(y(d.start) - y(d.start + d.value)),
      )
      .attr("fill", (d) =>
        d.category === "Working Capital" || d.category === "Total Equity"
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

    // Labels
    chart
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.category)! + x.bandwidth() / 2) // Center the label horizontally
      .attr("y", (d) => {
        if (d.category === "Working Capital" || d.category === "Total Equity") {
          const barPosition = d.start - d.value
          const barHeight = Math.abs(y(d.start) - y(barPosition))

          return y(barPosition) - barHeight - 6
        }

        if (d.value >= 0) {
          return y(d.start + d.value) - 6
        } else {
          return y(d.start + d.value) + 16
        }
      })
      .attr("text-anchor", "middle")
      .text((d) => {
        const valueInMillions = Math.abs(d.value) / 1e3
        const formatWithCommas = (val: number) => d3.format(",.0f")(val)
        const formattedValue = `${formatWithCommas(valueInMillions)}M`
        return d.value < 0 ? `-$${formattedValue}` : `$${formattedValue}`
      })
      .attr("class", "fill-gray-800 dark:fill-gray-200")
      .style("font", "13px 'Inter', sans-serif")
      .style("font-weight", "600")
  }, [selectedYear, categories, dataset])

  return <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
}

export default WaterfallBalanceSheet

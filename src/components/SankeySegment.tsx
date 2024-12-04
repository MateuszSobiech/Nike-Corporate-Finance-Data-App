"use client"
import * as d3 from "d3"
import { sankey as d3Sankey, sankeyCenter } from "d3-sankey"
import React, { useEffect, useRef } from "react"

// Defining the types for the data
type Node = {
  name: string
  value: number
  sourceLinks?: any[]
  targetLinks?: any[]
  x0?: number
  x1?: number
  y0?: number
  y1?: number
}

type Link = {
  source: Node
  target: Node
  value: number
  color: string
}

type SankeyProps = {
  data: { nodes: Node[]; links: Link[] }
  width: number
  height: number
}

const SankeySegment: React.FC<SankeyProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const sankey = d3Sankey<Node, Link>()
      .nodeId((d) => d.name)
      .nodeAlign(sankeyCenter)
      .nodeSort(() => 0) // nodeSort(null) throws errors
      .nodeWidth(15)
      .nodePadding(24)
      .extent([
        [0, 5],
        [width, height - 5],
      ])

    const { nodes, links } = sankey({
      nodes: data.nodes.map((d) => Object.assign({}, d)),
      links: data.links.map((d) => Object.assign({}, d)),
    })

    const svg = d3.select(svgRef.current).attr("viewBox", [0, 0, width, height])

    const levels = d3.group(nodes, (d) => d.x0)
    const levelTotals = new Map()

    levels.forEach((nodesAtLevel, level) => {
      const levelTotal = d3.sum(nodesAtLevel, (d) => d.value || 0)
      levelTotals.set(level, levelTotal)
    })

    // Adding nodes
    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("stroke-opacity", 0.3)
      .attr("x", (d) => (d.x0 as number) + 1)
      .attr("y", (d) => d.y0 as number)
      .attr("width", (d) => (d.x1 as number) - (d.x0 as number) - 2)
      .attr("height", (d) => (d.y1 as number) - (d.y0 as number))
      .attr("fill", (d) => {
        if (d.name === "Gross profit") return "#10B981"
        if (d.name === "Other income") return "#10B981"
        if (d.name === "Income before taxes") return "#10B981"
        if (d.name === "Net income") return "#10B981"
        if (d.name === "Cost of sales") return "#EF4444"
        if (d.name === "Tax expense") return "#EF4444"
        if (d.name === "Interest expense") return "#EF4444"
        if (d.name === "Selling and administrative expense") return "#EF4444"
        if (d.name === "Demand creation expense") return "#EF4444"
        if (d.name === "Operating overhead expense") return "#EF4444"

        let c

        if (d.sourceLinks) {
          for (const link of d.sourceLinks) {
            if (c === undefined) c = link.color
            else if (c !== link.color) c = null
          }
        }

        const fallbackColor = d3.color("#ccc")
        const color = d3.color(c ?? "#ccc")?.toString() || "#ccc"
        return color
          ? color.toString()
          : fallbackColor
            ? fallbackColor.toString()
            : "#ccc"
      })
      .append("title")
      .text((d) => `${d.name}\n${d.value.toLocaleString()}M`)

    // Adding links
    const link = svg
      .append("g")
      .attr("fill", "none")
      .selectAll("g")
      .data(links.sort((a, b) => (b.width ?? 0) - (a.width ?? 0)))
      .join("g")
      .attr("stroke", (d) => {
        const color =
          d3.color(d.color)?.toString() || d3.color("#ccc")?.toString()
        return color || "#ccc"
      })
      .style("mix-blend-mode", "multiply")

    const linkGenerator = d3.linkHorizontal()

    link
      .append("path")
      .attr("d", (d) =>
        linkGenerator({
          source: [d.source.x1 as number, d.source.y0 as number],
          target: [d.target.x0 as number, d.target.y0 as number],
        }),
      )
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", (d) => Math.max(1, d.width ?? 1))

    link
      .append("title")
      .attr("fill-opacity", 0.7)
      .text(
        (d) =>
          `${d.source.name} → ${d.target.name}\n${d.value.toLocaleString()}M`,
      )

    // Adding labels
    svg
      .append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .style("font", "10px 'Inter', sans-serif")
      .attr("x", (d) =>
        (d.x0 as number) < width / 2
          ? (d.x1 as number) + 6
          : (d.x0 as number) - 6,
      )
      .attr("y", (d) => ((d.y1 as number) + (d.y0 as number)) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) =>
        (d.x0 as number) < width / 2 ? "start" : "end",
      )
      .text((d) => d.name)
      .each(function (d) {
        const levelTotal = levelTotals.get(d.x0) || 1
        const percentage = (((d.value || 0) / levelTotal) * 100).toFixed(1)
        const absoluteValue = (d.value || 0).toLocaleString()

        d3
          .select(this)
          .append("tspan")
          .attr(
            "x",
            (d.x0 as number) < width / 2
              ? (d.x1 as number) + 6
              : (d.x0 as number) - 6,
          )
          .attr("dy", "1.2em").html(`
            <tspan font-weight="bold">${absoluteValue}M</tspan> 
            <tspan> (${percentage}%)</tspan>
          `)
      })
  }, [data, width, height])

  return <svg ref={svgRef} />
}

export default SankeySegment

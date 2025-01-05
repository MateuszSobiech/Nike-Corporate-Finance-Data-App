// "use client"

// import { Card } from "@/components/Card"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/Select"
// import { dataYears, waterfallWorkingCapital } from "@/data/balance_sheet_data"
// import { useState } from "react"

// export default function ExecutiveSummary() {
//   const [selectedYear, setSelectedYear] = useState(2024)

//   const filteredData = waterfallWorkingCapital.filter(
//     (item) => item.fiscal_year === selectedYear,
//   )
//   return (
//     <div>
//       <div className="space-y-10">
//         <div className="sticky top-0 z-20 mt-4 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
//           <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
//             Working Capital & Equity Highlights
//           </h2>
//           <div className="flex items-center">
//             <div className="w-40">
//               <Select
//                 value={selectedYear.toString()}
//                 onValueChange={(value) => setSelectedYear(Number(value))}
//               >
//                 <SelectTrigger className="mx-auto h-8">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {dataYears.map((item) => (
//                     <SelectItem key={item.value} value={item.value.toString()}>
//                       {item.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//         <Card>
//             waterfall chart
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { dataYears, waterfallWorkingCapital } from "@/data/balance_sheet_data"
import * as d3 from "d3"
import { useEffect, useState } from "react"

export default function ExecutiveSummary() {
  const [selectedYear, setSelectedYear] = useState(2024)

  const filteredData = waterfallWorkingCapital.filter(
    (item) => item.fiscal_year === selectedYear,
  )

  useEffect(() => {
    if (!filteredData.length) return

    // Clear previous chart
    d3.select("#waterfall-chart").selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const svg = d3
      .select("#waterfall-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Prepare data for waterfall chart
    const totalAssets = filteredData[0].total_current_assets
    const totalLiabilities = filteredData[0].total_current_liabilities
    const netWorkingCapital = totalAssets + totalLiabilities // Ensures it balances to 0.

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

    // Scale setup
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

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))

    svg.append("g").call(d3.axisLeft(y))

    // Bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.category)!)
      .attr("y", (d) =>
        d.category === "Net Working Capital"
          ? y(d.start) // Start at the correct position for Net Working Capital
          : y(Math.max(d.start, d.start + d.value)),
      )
      .attr("width", x.bandwidth())
      .attr("height", (d) =>
        d.category === "Net Working Capital"
          ? Math.abs(y(d.start) - y(0)) // Extend Net Working Capital to 0
          : Math.abs(y(d.start) - y(d.start + d.value)),
      )
      .attr(
        "fill",
        (d) =>
          d.category === "Net Working Capital"
            ? "#2196F3" // Blue for Net Working Capital
            : d.value > 0
              ? "#4CAF50" // Green for positive
              : "#F44336", // Red for negative
      )

    // Dotted Lines (add between end of the bars, excluding the last one)
    svg
      .selectAll(".dotted-line")
      .data(data.slice(0, -1)) // Exclude the last item from the dotted line data
      .enter()
      .append("line")
      .attr("class", "dotted-line")
      .attr("x1", (d) => x(d.category)! + x.bandwidth())
      .attr("y1", (d) => y(d.start + d.value)) // End of the previous bar
      .attr("x2", (d, i, nodes) => {
        const nextData = data[i + 1]
        if (nextData) {
          return x(nextData.category)! // Start of the next bar
        }
        return x(d.category)! + x.bandwidth()
      })
      .attr("y2", (d, i, nodes) => {
        const nextData = data[i + 1]
        if (nextData) {
          return y(nextData.start) // Start of the next bar
        }
        return y(0) // If no next bar, it ends at y=0
      })
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4") // Dotted line style

    // Labels
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.category)! + x.bandwidth() / 2)
      .attr("y", (d) =>
        d.category === "Net Working Capital"
          ? y(0) - 5 // Place label just above 0 for Net Working Capital
          : y(d.start + d.value) - 5,
      )
      .attr("text-anchor", "middle")
      .text((d) =>
        d.category === "Net Working Capital"
          ? d3.format(",")(Math.abs(d.value)) // Display Net Working Capital as positive
          : d3.format(",")(d.value),
      )
      .style("fill", "black")
  }, [filteredData])

  return (
    <div>
      <div className="space-y-10">
        <div className="sticky top-0 z-20 mt-4 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
          <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
            Working Capital & Equity Highlights
          </h2>
          <div className="flex items-center">
            <div className="w-40">
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(Number(value))}
              >
                <SelectTrigger className="mx-auto h-8">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {dataYears.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <div id="waterfall-chart"></div>
        </div>
      </div>
    </div>
  )
}

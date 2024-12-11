"use client"

import { AreaChart } from "@/components/AreaChart"
import { Card } from "@/components/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/Select"
import { PLKeyMetrics, PLKeyRatios } from "@/data/profit_and_loss_data"
// import { useState } from "react"

export default function ProfitLoss() {
  const tooltipFormatter = (value: number) => `$${value.toLocaleString()}M`

  // Preprocess data for Y-axis display in billions
  const processMetricsData = PLKeyMetrics.map((item) => ({
    fiscal_year: item.fiscal_year,
    revenues: item.Revenues / 1000,
    cost_of_sales: item["Cost of Sales"] / 1000,
  }))

  const categoriesMetrics = [
    { label: "Revenues", value: "revenues" },
    { label: "Cost of Sales", value: "cost_of_sales" },
  ]

  const categoriesRatios = [
    { label: "Gross Margin", value: "gross_margin" },
    {
      label: "Total Selling Expense as % of Revenues",
      value: "percent_of_revenues",
    },
  ]

  // // State for selected fiscal year
  // const [selectedYear, setSelectedYear] = useState(2024)

  // // Filter data based on selected fiscal year
  // const getFilteredData = (data: []) => {
  //   return data.filter((item) => item.fiscal_year === selectedYear)
  // }

  return (
    <div className="pt-6">
      <div className="space-y-10">
        <section>
          <div className="grid grid-cols-1">
            <Card>
              <h2 className="text-m pb-1 font-medium text-gray-900 dark:text-gray-100">
                Key Financial Profit & Loss Highlights
              </h2>
              <p className="pb-6 text-sm text-gray-500 dark:text-gray-400">
                Highlighting essential P&L metrics and ratios for tracking
                Nike's revenue, costs, and profitability performance.
              </p>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1" className="text-sm">
                    Revenue & Cost Metrics
                  </TabsTrigger>
                  <TabsTrigger value="tab2" className="text-sm">
                    Profitability Ratios
                  </TabsTrigger>
                </TabsList>
                <div className="ml-2 mt-4">
                  <TabsContent
                    value="tab1"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  >
                    <AreaChart
                      className="mt-6"
                      data={PLKeyMetrics}
                      index="fiscal_year"
                      categories={categoriesMetrics.map(
                        (category) => category.label,
                      )}
                      colors={["emerald", "red"]}
                      valueFormatter={tooltipFormatter}
                      yAxisFormatter={(value: number) =>
                        `$${value.toFixed(0)}B`
                      }
                      showLegend={true}
                      showGridLines={true}
                      yAxisWidth={50}
                    />
                  </TabsContent>
                  <TabsContent
                    value="tab2"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  >
                    <AreaChart
                      className="mt-6"
                      data={PLKeyRatios}
                      index="fiscal_year"
                      categories={categoriesRatios.map(
                        (category) => category.label,
                      )}
                      colors={["amber", "gray"]}
                      valueFormatter={(value) => `${value.toFixed(1)}%`}
                      showLegend={true}
                      showGridLines={true}
                      yAxisWidth={50}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </section>
        <section>
          <p>table</p>
        </section>
      </div>
    </div>
  )
}

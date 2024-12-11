"use client"

import { AreaChart } from "@/components/AreaChart"
import { Card } from "@/components/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import {
  PLKeyMetrics,
  PLKeyRatios,
  dataYears,
} from "@/data/profit_and_loss_data"
import { useState } from "react"

import { Badge } from "@/components/Badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"

export default function ProfitLoss() {
  const data: Array<{
    workspace: string
    owner: string
    status: string
    costs: string
    region: string
    capacity: string
    lastEdited: string
  }> = [
    {
      workspace: "sales_by_day_api",
      owner: "John Doe",
      status: "Live",
      costs: "$3,509.00",
      region: "US-West 1",
      capacity: "99%",
      lastEdited: "23/09/2023 13:00",
    },
    {
      workspace: "marketing_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "test_environment",
      owner: "David Clark",
      status: "Inactive",
      costs: "$800.00",
      region: "EU-Central 1",
      capacity: "40%",
      lastEdited: "25/09/2023 16:20",
    },
    {
      workspace: "sales_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "development_env",
      owner: "Mike Johnson",
      status: "Inactive",
      costs: "$4,200.00",
      region: "EU-West 1",
      capacity: "60%",
      lastEdited: "21/09/2023 14:30",
    },
    {
      workspace: "new_workspace_1",
      owner: "Alice Brown",
      status: "Inactive",
      costs: "$2,100.00",
      region: "US-West 2",
      capacity: "75%",
      lastEdited: "24/09/2023 09:15",
    },
  ]

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

  // State for selected fiscal year
  const [selectedYear, setSelectedYear] = useState(2024)

  // Filter data based on selected fiscal year
  const getFilteredData = (data: []) => {
    return data.filter((item) => item.fiscal_year === selectedYear)
  }

  return (
    <div className="pt-6">
      <div className="space-y-10">
        <section>
          <div className="grid grid-cols-1">
            <Card>
              <h2 className="text-m pb-2 font-medium text-gray-900 dark:text-gray-100">
                Key Financial Profit & Loss Highlights
              </h2>
              <p className="pb-6 text-sm text-gray-500 dark:text-gray-400">
                Highlighting essential Profit & Loss metrics and ratios for
                tracking Nike's revenue, costs, and profitability performance.
              </p>

              <Tabs defaultValue="tab1">
                <TabsList className="border-b border-gray-200 dark:border-gray-700">
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
                      colors={["orange", "gray"]}
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
          <div className="sticky top-16 z-20 mt-14 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 sm:pt-4 lg:top-0 lg:mx-0 lg:px-0 lg:pt-4 dark:border-gray-800 dark:bg-gray-950">
            <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
              Profit & Loss Comparison: Selected Fiscal Year vs. Previous Year
            </h2>
            <div className="flex items-center">
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:R9jtt7qj6:-trigger-tab1"
                id="radix-:R9jtt7qj6:-content-tab1"
                className="mr-2 space-y-2 text-sm leading-7 text-gray-600 outline outline-0 outline-offset-2 outline-orange-500 focus-visible:outline-2 dark:text-gray-500 dark:outline-orange-500"
              ></div>

              <div className="w-40">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="mx-auto h-8">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataYears.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <TableRoot className="mt-8">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Workspace</TableHeaderCell>
                    <TableHeaderCell>Owner</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Region</TableHeaderCell>
                    <TableHeaderCell>Capacity</TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Costs
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Last edited
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.workspace}>
                      <TableCell>{item.workspace}</TableCell>
                      <TableCell>{item.owner}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Inactive" ? "warning" : "default"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.capacity}</TableCell>
                      <TableCell className="text-right">{item.costs}</TableCell>
                      <TableCell className="text-right">
                        {item.lastEdited}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableRoot>
          </div>
        </section>
      </div>
    </div>
  )
}

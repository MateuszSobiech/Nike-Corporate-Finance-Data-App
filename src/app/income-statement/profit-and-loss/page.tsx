"use client"

import { AreaChart } from "@/components/AreaChart"
import { Card } from "@/components/Card"
import { SparkAreaChart } from "@/components/SparkChart"
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
  ResultsOfOperations,
  dataYears,
} from "@/data/profit_and_loss_data"
import { useState } from "react"

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
  // AREA CHART
  const tooltipFormatter = (value: number) => `$${value.toLocaleString()}M`

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

  // TABLE
  // State for selected fiscal year
  const [selectedYear, setSelectedYear] = useState(2024)

  // Filtered data for the selected year
  const filteredData = ResultsOfOperations.find(
    (item) => item.fiscal_year === selectedYear,
  )
  const previousData = ResultsOfOperations.find(
    (item) => item.fiscal_year === selectedYear - 1,
  )

  // Define the keys to render dynamically
  const dataKeys = [
    { key: "cv_revenues", label: "Revenues", type: "currency" as const },
    {
      key: "cv_cost_of_sales",
      label: "Cost of sales",
      type: "currency" as const,
    },
    {
      key: "cv_gross_profit",
      label: "Gross profit",
      type: "currency" as const,
    },
    {
      key: "cv_gross_margin",
      label: "Gross margin",
      type: "percentage" as const,
    },
    {
      key: "cv_demand_creation_expense",
      label: "Demand creation expense",
      type: "currency" as const,
    },
    {
      key: "cv_operating_overhead_expense",
      label: "Operating overhead expense",
      type: "currency" as const,
    },
    {
      key: "cv_total_selling_and_administrative_expense",
      label: "Total selling and administrative expense",
      type: "currency" as const,
    },
    {
      key: "cv_percent_of_revenues",
      label: "% of revenues",
      type: "percentage" as const,
    },
    {
      key: "cv_interest_expense_income_net",
      label: "Interest expense (income), net",
      type: "currency" as const,
    },
    {
      key: "cv_other_income_expense_net",
      label: "Other (income) expense, net",
      type: "currency" as const,
    },
    {
      key: "cv_income_before_income_taxes",
      label: "Income before income taxes",
      type: "currency" as const,
    },
    {
      key: "cv_income_tax_expense",
      label: "Income tax expense",
      type: "currency" as const,
    },
    {
      key: "cv_effective_tax_rate",
      label: "Effective tax rate",
      type: "percentage" as const,
    },
    { key: "cv_net_income", label: "NET INCOME", type: "currency" as const },
    {
      key: "cv_diluted_earnings_per_common_share",
      label: "Diluted earnings per common share",
      type: "currency" as const,
    },
  ]

  // Format numbers for display
  const formatNumber = (
    num: number,
    type: "currency" | "percentage",
    label: string,
  ): string => {
    if (label === "Diluted earnings per common share" && type === "currency") {
      return `$${num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    }

    if (type === "currency") {
      return `$${(num / 1_000).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}M`
    }

    if (type === "percentage") {
      return `${num.toFixed(1)}%`
    }

    return num.toString()
  }

  const calculateChange = (
    current: number,
    previous: number,
    type: "currency" | "percentage",
    label: string,
    showAbsolute = false,
  ): string => {
    if (current === undefined || previous === undefined || previous === 0) {
      return "N/A"
    }

    if (showAbsolute) {
      const change = current - previous

      if (type === "percentage") {
        const percentChange = ((current - previous) / previous) * 100
        return `${percentChange > 0 ? "+" : ""}${percentChange.toFixed(1)}%`
      } else {
        return formatNumber(change, type, label)
      }
    }

    if (type === "percentage") {
      const change = current - previous
      return `${change > 0 ? "+" : ""}${change.toFixed(1)} p.p.`
    } else {
      const percentChange = ((current - previous) / previous) * 100
      return `${percentChange > 0 ? "+" : ""}${percentChange.toFixed(1)}%`
    }
  }

  const determineBadgeVariant = (
    label: string,
    current: number,
    previous: number,
  ): "success" | "error" => {
    if (!previous || !current) return "error"

    if (
      [
        "Revenues",
        "Income before income taxes",
        "NET INCOME",
        "Diluted earnings per common share",
      ].includes(label)
    ) {
      return current > previous ? "success" : "error"
    }

    if (
      [
        "Cost of sales",
        "Demand creation expense",
        "Operating overhead expense",
        "Total selling and administrative expense",
        "% of revenues",
        "Interest expense (income), net",
        "Other (income) expense, net",
        "Income tax expense",
        "Effective tax rate",
      ].includes(label)
    ) {
      return current < previous ? "success" : "error"
    }

    return current >= previous ? "success" : "error"
  }

  return (
    <div className="pt-6">
      <div className="space-y-10">
        <section>
          <div className="grid grid-cols-1">
            <Card>
              <h2 className="pb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
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
                      valueTooltipFormatter={tooltipFormatter}
                      valueFormatter={(value: number) =>
                        `$${(value / 1000).toFixed(1)}B`
                      }
                      showLegend={true}
                      showGridLines={true}
                      yAxisWidth={60}
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
                      yAxisWidth={60}
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
              Results of Operations
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
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(Number(value))}
                >
                  <SelectTrigger className="mx-auto h-8">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataYears.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value.toString()}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <TableRoot>
              <Table className="w-full">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>{""}</TableHeaderCell>
                    <TableHeaderCell>FY{selectedYear}</TableHeaderCell>
                    <TableHeaderCell>FY{selectedYear - 1}</TableHeaderCell>
                    <TableHeaderCell>Change</TableHeaderCell>
                    <TableHeaderCell>% Change</TableHeaderCell>
                    <TableHeaderCell>Last 5Y Trend</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataKeys.map(({ key, label, type }) => (
                    <TableRow
                      key={key}
                      className={
                        label === "Cost of sales"
                          ? "border-b-10 border-black"
                          : ""
                      }
                    >
                      {/* Metric name */}
                      <TableCell
                        className={`${
                          [
                            "Gross profit",
                            "Gross margin",
                            "Total selling and administrative expense",
                            "% of revenues",
                            "Effective tax rate",
                          ].includes(label)
                            ? "text-indent-4 text-blue-600"
                            : "text-black dark:text-gray-100"
                        } px-4 py-2 font-semibold`}
                      >
                        {label}
                      </TableCell>

                      {/* Selected Year Column */}
                      <TableCell
                        className={`${
                          label === "NET INCOME" ? "font-semibold" : ""
                        }`}
                      >
                        {filteredData && key in filteredData
                          ? formatNumber(
                              filteredData[key as keyof typeof filteredData],
                              type,
                              label,
                            )
                          : "N/A"}
                      </TableCell>

                      {/* Previous Year Column */}
                      <TableCell
                        className={`${label === "NET INCOME" ? "font-semibold" : ""}`}
                      >
                        {previousData && key in previousData
                          ? formatNumber(
                              previousData[key as keyof typeof previousData],
                              type,
                              label,
                            )
                          : "N/A"}
                      </TableCell>

                      {/* Change Column */}
                      <TableCell
                        className={`${label === "NET INCOME" ? "font-semibold" : ""}`}
                      >
                        {filteredData && key in filteredData ? (
                          <>
                            {previousData &&
                            previousData[`prev_${key}`] !== undefined ? (
                              <span
                                className={`${
                                  label === "NET INCOME" ? "font-semibold" : ""
                                } ${
                                  determineBadgeVariant(
                                    label,
                                    filteredData[
                                      key as keyof typeof filteredData
                                    ] || 0,
                                    previousData[`prev_${key}`] || 0,
                                  ) === "success"
                                    ? "text-emerald-600 dark:text-emerald-500"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {type === "currency"
                                  ? calculateChange(
                                      filteredData[
                                        key as keyof typeof filteredData
                                      ],
                                      previousData[`prev_${key}`], // Corrected to access `prev_*` field
                                      type,
                                      label,
                                      true,
                                    )
                                  : calculateChange(
                                      filteredData[
                                        key as keyof typeof filteredData
                                      ],
                                      previousData[`prev_${key}`], // Corrected to access `prev_*` field
                                      type,
                                      label,
                                      false,
                                    )}
                              </span>
                            ) : (
                              "N/A"
                            )}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>

                      {/* % Change Column */}
                      <TableCell
                        className={`${
                          label === "NET INCOME" ? "font-semibold" : ""
                        }`}
                      >
                        {[
                          "Interest expense (income), net",
                          "Other (income) expense, net",
                        ].includes(label) ? (
                          ""
                        ) : type === "percentage" ? (
                          ""
                        ) : (
                          <span
                            className={`rounded px-2 py-1 text-sm font-medium text-white ${
                              determineBadgeVariant(
                                label,
                                filteredData?.[
                                  key as keyof typeof filteredData
                                ] || 0,
                                previousData?.[
                                  `prev_${key}` as keyof typeof previousData
                                ] || 0,
                              ) === "success"
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                            }`}
                          >
                            {filteredData && previousData
                              ? calculateChange(
                                  filteredData[
                                    key as keyof typeof filteredData
                                  ],
                                  previousData[
                                    `prev_${key}` as keyof typeof previousData
                                  ],
                                  type,
                                  label,
                                )
                              : "N/A"}
                          </span>
                        )}
                      </TableCell>

                      {/* Spark Area Chart */}
                      <TableCell>
                        {filteredData && key in filteredData && (
                          <SparkAreaChart
                            data={ResultsOfOperations.filter(
                              (item) =>
                                item.fiscal_year <= selectedYear &&
                                item.fiscal_year > selectedYear - 5,
                            ).map((item) => ({
                              year: item.fiscal_year,
                              Performance:
                                item[key as keyof typeof ResultsOfOperations],
                            }))}
                            categories={["Performance"]}
                            index={"year"}
                            colors={[
                              determineBadgeVariant(
                                label,
                                filteredData[
                                  key as keyof typeof filteredData
                                ] || 0,
                                previousData?.[
                                  `prev_${key}` as keyof typeof previousData
                                ] || 0,
                              ) === "success"
                                ? "emerald" // Green for positive trend
                                : "red", // Red for negative trend
                            ]}
                            valueRange={{
                              min: Math.min(
                                ...ResultsOfOperations.filter(
                                  (item) =>
                                    item.fiscal_year <= selectedYear &&
                                    item.fiscal_year > selectedYear - 5,
                                ).map(
                                  (item) =>
                                    item[
                                      key as keyof typeof ResultsOfOperations
                                    ] || 0,
                                ),
                              ),
                              max: Math.max(
                                ...ResultsOfOperations.filter(
                                  (item) =>
                                    item.fiscal_year <= selectedYear &&
                                    item.fiscal_year > selectedYear - 5,
                                ).map(
                                  (item) =>
                                    item[
                                      key as keyof typeof ResultsOfOperations
                                    ] || 0,
                                ),
                              ),
                            }}
                            className="h-8 w-20"
                          />
                        )}
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

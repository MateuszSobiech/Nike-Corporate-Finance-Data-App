"use client"

import { Card } from "@/components/Card"
import { Divider } from "@/components/Divider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"
import WaterfallBalanceSheet from "@/components/WaterfallBalanceSheet"
import { dataYears, waterfallBalanceSheet } from "@/data/balance_sheet_data"
import { useState } from "react"

export default function ExecutiveSummary() {
  const [selectedYear, setSelectedYear] = useState(2024)

  const filteredData = waterfallBalanceSheet.filter(
    (item) => item.fiscal_year === selectedYear,
  )

  const previousData = waterfallBalanceSheet.filter(
    (item) => item.fiscal_year === selectedYear - 1,
  )

  const dataCurrentKeys = [
    {
      key: "total_current_assets",
      label: "Current Assets",
      type: "currency" as const,
    },
    {
      key: "total_current_liabilities",
      label: "Current Liabilities",
      type: "currency" as const,
    },
    {
      key: "net_working_capital",
      label: "Working Capital",
      type: "currency" as const,
    },
    {
      key: "current_ratio",
      label: "Current Ratio",
      type: "percentage" as const,
    },
    {
      key: "quick_ratio",
      label: "Quick Ratio",
      type: "percentage" as const,
    },
  ]

  const dataTotalKeys = [
    { key: "total_assets", label: "Total Assets", type: "currency" as const },
    {
      key: "total_liabilities",
      label: "Total Liabilities",
      type: "currency" as const,
    },
    {
      key: "total_equity",
      label: "Total Equity",
      type: "currency" as const,
    },
    {
      key: "debt_ratio",
      label: "Debt to Equity Ratio",
      type: "percentage" as const,
    },
  ]

  const formatValue = (num: number | null, type: "currency" | "percentage") => {
    if (num === null || num === undefined) {
      return "N/A"
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

  const determineBadgeVariant = (
    label: string,
    current: number,
    previous: number,
  ): "success" | "error" => {
    if (!previous || !current) return "error"

    if (["Working Capital", "Total Equity", "Current Ratio"].includes(label)) {
      return current > previous ? "success" : "error"
    }

    if (["Current Liabilities", "Total Liabilities"].includes(label)) {
      return current < previous ? "success" : "error"
    }

    return current >= previous ? "success" : "error"
  }

  return (
    <div>
      <div>
        <div className="sticky top-0 z-20 mt-4 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
          <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
            Working Capital & Total Equity Highlights
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
        <div className="mt-6 flex">
          <Card className="mr-4">
            <div className="flex-1">
              <h3 className="mb-2 text-left text-lg font-medium text-gray-900 dark:text-gray-100">
                FY{selectedYear} Working Capital
              </h3>
              <WaterfallBalanceSheet
                selectedYear={selectedYear}
                dataset={waterfallBalanceSheet}
                categories={[
                  { name: "Current Assets", field: "total_current_assets" },
                  {
                    name: "Current Liabilities",
                    field: "total_current_liabilities",
                  },
                  { name: "Working Capital", field: "net_working_capital" },
                ]}
              />
              <Divider />
              <h3 className="mb-2 text-left text-lg font-medium text-gray-900 dark:text-gray-100">
                Working Capital Breakdown
              </h3>
              <TableRoot>
                <Table className="w-full">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="text-xs">
                        {""}
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        FY{selectedYear}
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        FY{selectedYear - 1}
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        Change
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        % Change
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="text-xs">
                    {dataCurrentKeys.map(({ key, label, type }) => {
                      let currentValue = null
                      let previousValue = null

                      if (key === "current_ratio" || key === "quick_ratio") {
                        const currentAssets =
                          filteredData[0]?.total_current_assets || null
                        const currentLiabilities =
                          Math.abs(
                            filteredData[0]?.total_current_liabilities,
                          ) || null
                        const inventories = filteredData[0]?.inventories || null

                        const previousAssets =
                          previousData[0]?.total_current_assets || null
                        const previousLiabilities =
                          Math.abs(
                            previousData[0]?.total_current_liabilities,
                          ) || null
                        const previousInventories =
                          previousData[0]?.inventories || null

                        if (key === "current_ratio") {
                          currentValue =
                            currentAssets && currentLiabilities
                              ? (currentAssets / currentLiabilities) * 100
                              : null
                          previousValue =
                            previousAssets && previousLiabilities
                              ? (previousAssets / previousLiabilities) * 100
                              : null
                        }

                        if (key === "quick_ratio") {
                          currentValue =
                            currentAssets &&
                            currentLiabilities &&
                            inventories !== null
                              ? ((currentAssets - inventories) /
                                  currentLiabilities) *
                                100
                              : null
                          previousValue =
                            previousAssets &&
                            previousLiabilities &&
                            previousInventories !== null
                              ? ((previousAssets - previousInventories) /
                                  previousLiabilities) *
                                100
                              : null
                        }
                      } else {
                        currentValue = filteredData[0]?.[key] || null
                        previousValue = previousData[0]?.[key] || null
                      }

                      const change =
                        currentValue !== null && previousValue !== null
                          ? (currentValue - previousValue).toFixed(0)
                          : null

                      const percentageChange =
                        currentValue !== null && previousValue !== null
                          ? ((currentValue - previousValue) / previousValue) *
                            100
                          : null

                      const hasIndent = [
                        "Working Capital",
                        "Total Equity",
                      ].includes(label)
                      const hasBorder = [
                        "Current Liabilities",
                        "Total Liabilities",
                      ].includes(label)

                      return (
                        <TableRow
                          key={key}
                          className={
                            hasBorder ? "!border-b !border-b-gray-400" : ""
                          }
                        >
                          {/* Metric */}
                          <TableCell
                            className={`${
                              hasIndent ? "!pl-12" : ""
                            } px-4 py-2 text-xs font-semibold text-black dark:text-gray-100`}
                          >
                            {label}
                          </TableCell>

                          {/* FY Selected Year */}
                          <TableCell className="text-xs">
                            {key === "current_ratio" || key === "quick_ratio"
                              ? `${currentValue?.toFixed(0)}%`
                              : formatValue(currentValue, type)}
                          </TableCell>

                          {/* FY Previous Year */}
                          <TableCell className="text-xs">
                            {key === "current_ratio" || key === "quick_ratio"
                              ? `${previousValue?.toFixed(0)}%`
                              : formatValue(previousValue, type)}
                          </TableCell>

                          {/* Change */}
                          <TableCell className="text-xs">
                            {key === "current_ratio" || key === "quick_ratio"
                              ? change === null
                                ? "N/A"
                                : `${change} pp`
                              : formatValue(change, type)}
                          </TableCell>

                          {/* % Change */}
                          <TableCell>
                            {key === "current_ratio" ||
                            key === "quick_ratio" ? (
                              ""
                            ) : (
                              <span
                                className={`rounded px-2 py-1 text-xs font-medium text-white ${
                                  determineBadgeVariant(
                                    label,
                                    currentValue || 0,
                                    previousValue || 0,
                                  ) === "success"
                                    ? "bg-emerald-500"
                                    : "bg-rose-500"
                                }`}
                              >
                                {percentageChange
                                  ? `${percentageChange.toFixed(1)}%`
                                  : "N/A"}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableRoot>
            </div>
          </Card>

          <Card className="ml-4">
            <div className="flex-1">
              <h3 className="mb-2 text-left text-lg font-medium text-gray-900 dark:text-gray-100">
                FY{selectedYear} Total Equity
              </h3>
              <WaterfallBalanceSheet
                selectedYear={selectedYear}
                dataset={waterfallBalanceSheet}
                categories={[
                  { name: "Total Assets", field: "total_assets" },
                  { name: "Total Liabilities", field: "total_liabilities" },
                  { name: "Total Equity", field: "total_equity" },
                ]}
              />
              <Divider />
              <h3 className="mb-2 text-left text-lg font-medium text-gray-900 dark:text-gray-100">
                Total Equity Breakdown
              </h3>
              <TableRoot>
                <Table className="w-full">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="text-xs">
                        {""}
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        FY{selectedYear}
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        FY{selectedYear - 1}
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        Change
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs">
                        % Change
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="text-xs">
                    {dataTotalKeys.map(({ key, label, type }) => {
                      let currentValue = null
                      let previousValue = null

                      if (key === "debt_ratio") {
                        const totalAssets =
                          filteredData[0]?.total_assets || null
                        const totalLiabilities =
                          Math.abs(filteredData[0]?.total_liabilities) || null

                        const previousAssets =
                          previousData[0]?.total_assets || null
                        const previousLiabilities =
                          Math.abs(previousData[0]?.total_liabilities) || null

                        if (key === "debt_ratio") {
                          currentValue =
                            totalAssets && totalLiabilities
                              ? (totalLiabilities / totalAssets) * 100
                              : null
                          previousValue =
                            previousAssets && previousLiabilities
                              ? (previousLiabilities / previousAssets) * 100
                              : null
                        }
                      } else {
                        currentValue = filteredData[0]?.[key] || null
                        previousValue = previousData[0]?.[key] || null
                      }

                      const change =
                        currentValue !== null && previousValue !== null
                          ? (currentValue - previousValue).toFixed(0)
                          : null

                      const percentageChange =
                        currentValue !== null && previousValue !== null
                          ? ((currentValue - previousValue) / previousValue) *
                            100
                          : null

                      const hasIndent = ["Total Equity"].includes(label)
                      const hasBorder = ["Total Liabilities"].includes(label)

                      return (
                        <TableRow
                          key={key}
                          className={
                            hasBorder ? "!border-b !border-b-gray-400" : ""
                          }
                        >
                          {/* Metric */}
                          <TableCell
                            className={`${
                              hasIndent ? "!pl-12" : ""
                            } px-4 py-2 text-xs font-semibold text-black dark:text-gray-100`}
                          >
                            {label}
                          </TableCell>

                          {/* FY Selected Year */}
                          <TableCell className="text-xs">
                            {key === "debt_ratio"
                              ? `${currentValue?.toFixed(0)}%`
                              : formatValue(currentValue, type)}
                          </TableCell>

                          {/* FY Previous Year */}
                          <TableCell className="text-xs">
                            {key === "debt_ratio"
                              ? `${previousValue?.toFixed(0)}%`
                              : formatValue(previousValue, type)}
                          </TableCell>

                          {/* Change */}
                          <TableCell className="text-xs">
                            {key === "debt_ratio"
                              ? change === null
                                ? "N/A"
                                : `${change} pp`
                              : formatValue(change, type)}
                          </TableCell>

                          {/* % Change */}
                          <TableCell>
                            {key === "debt_ratio" ? (
                              ""
                            ) : (
                              <span
                                className={`rounded px-2 py-1 text-xs font-medium text-white ${
                                  determineBadgeVariant(
                                    label,
                                    currentValue || 0,
                                    previousValue || 0,
                                  ) === "success"
                                    ? "bg-emerald-500"
                                    : "bg-rose-500"
                                }`}
                              >
                                {percentageChange
                                  ? `${percentageChange.toFixed(1)}%`
                                  : "N/A"}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableRoot>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

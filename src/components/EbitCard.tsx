"use client"

import { Badge } from "@/components/Badge"
import { AreaChart } from "@tremor/react"

type EbitCardProps = {
  title: string
  value: number | string
  previous: number | string
  metricType: "currency" | "percentage"
  data: { fiscal_year: number; value: number }[]
  selectedYear: number
}

export default function EbitCard({
  title,
  value,
  previous,
  metricType,
  data,
  selectedYear,
}: EbitCardProps) {
  const formatNumber = (
    num: number | string,
    type: "currency" | "percentage",
  ) => {
    if (typeof num !== "number") return num

    if (type === "currency") {
      const formattedValue = (num / 1_000).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      return `$${formattedValue}M`
    }

    return `${num.toFixed(1)}%`
  }

  const calculatePercentageChange = (
    current: number,
    previous: number,
  ): string => {
    if (!previous) return "N/A"
    const change = ((current - previous) / previous) * 100
    const formattedChange =
      change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1)
    return `${formattedChange}%`
  }

  const formattedValue = formatNumber(value, metricType)
  const formattedPrevious = formatNumber(previous, metricType)

  const percentageChange =
    typeof value === "number" && typeof previous === "number"
      ? calculatePercentageChange(value, previous)
      : "N/A"

  const badgeVariant =
    typeof value === "number" &&
    typeof previous === "number" &&
    value >= previous
      ? "success"
      : "error"

  const filteredData = data.filter((item) => item.fiscal_year <= selectedYear)

  const chartColor =
    badgeVariant === "success" ? "text-green-700" : "text-red-700"

  return (
    <div className="grid-col-1 grid">
      <div className="bg-white dark:bg-gray-800">
        <div>
          <div className="flex items-center">
            <h1 className="mr-2 text-sm font-bold text-gray-900 dark:text-gray-50">
              {title}
            </h1>
            <Badge variant={badgeVariant}>{percentageChange}</Badge>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-xl font-medium text-gray-900 dark:text-gray-50">
              {formattedValue}
            </p>
            <p className="text-sm text-gray-500">from {formattedPrevious}</p>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <AreaChart
              data={filteredData}
              index="fiscal_year"
              categories={["value"]}
              className={`h-48 ${chartColor}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

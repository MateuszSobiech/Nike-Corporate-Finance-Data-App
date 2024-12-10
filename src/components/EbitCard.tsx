"use client"

import { Badge } from "@/components/Badge"
import { Divider } from "@/components/Divider"
import { EbitRegion } from "@/data/ebit_data"
import { AreaChart, BarList } from "@tremor/react"

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

  const calculateChange = (
    current: number,
    previous: number,
    type: "currency" | "percentage",
  ): string => {
    if (!previous) return "N/A"

    if (type === "percentage") {
      const change = current - previous
      const formattedChange =
        change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1)
      return `${formattedChange} p.p.`
    }

    const change = ((current - previous) / previous) * 100
    const formattedChange =
      change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1)
    return `${formattedChange}%`
  }

  const determineBadgeVariant = (
    title: string,
    current: number,
    previous: number,
  ): "success" | "error" => {
    if (!previous || !current) return "error"

    if (["EBIT", "EBIT Margin", "Revenue"].includes(title)) {
      return current > previous ? "success" : "error"
    }

    if (["Operating Expenses", "OpEx as % of Revenue"].includes(title)) {
      return current < previous ? "success" : "error"
    }

    return current >= previous ? "success" : "error"
  }

  const getBarListData = (title: string, selectedYear: number) => {
    const yearData = EbitRegion.find(
      (item) => item.fiscal_year === selectedYear && item.title === title,
    )

    if (!yearData) return []

    return [
      {
        name: "North America",
        value: yearData.na_value,
        previous: yearData.na_previous,
      },
      {
        name: "Europe, Middle East & Africa",
        value: yearData.emea_value,
        previous: yearData.emea_previous,
      },
      {
        name: "Greater China",
        value: yearData.cn_value,
        previous: yearData.cn_previous,
      },
      {
        name: "Asia Pacific & Latin America",
        value: yearData.apla_value,
        previous: yearData.apla_previous,
      },
    ]
  }

  // const getBarListData = (title: string, selectedYear: number) => {
  //   const yearData = EbitRegion.find(
  //     (item) => item.fiscal_year === selectedYear && item.title === title,
  //   )

  //   if (!yearData) return []

  //   const formatPercentageChange = (current: number, previous: number) => {
  //     if (current === null || previous === null) return "N/A"
  //     const change = current - previous
  //     const formattedChange =
  //       change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1)
  //     return `${formattedChange} p.p.`
  //   }

  //   const formatPercentage = (value: number) => {
  //     return value > 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`
  //   }

  //   return [
  //     {
  //       name: "North America",
  //       value:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentage(yearData.na_value)
  //           : formatNumber(yearData.na_value, yearData.metric_type),
  //       previous:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentageChange(yearData.na_value, yearData.na_previous)
  //           : formatNumber(yearData.na_previous, yearData.metric_type),
  //     },
  //     {
  //       name: "Europe, Middle East & Africa",
  //       value:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentage(yearData.emea_value)
  //           : formatNumber(yearData.emea_value, yearData.metric_type),
  //       previous:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentageChange(
  //               yearData.emea_value,
  //               yearData.emea_previous,
  //             )
  //           : formatNumber(yearData.emea_previous, yearData.metric_type),
  //     },
  //     {
  //       name: "Greater China",
  //       value:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentage(yearData.cn_value)
  //           : formatNumber(yearData.cn_value, yearData.metric_type),
  //       previous:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentageChange(yearData.cn_value, yearData.cn_previous)
  //           : formatNumber(yearData.cn_previous, yearData.metric_type),
  //     },
  //     {
  //       name: "Asia Pacific & Latin America",
  //       value:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentage(yearData.apla_value)
  //           : formatNumber(yearData.apla_value, yearData.metric_type),
  //       previous:
  //         yearData.metric_type === "percentage"
  //           ? formatPercentageChange(
  //               yearData.apla_value,
  //               yearData.apla_previous,
  //             )
  //           : formatNumber(yearData.apla_previous, yearData.metric_type),
  //     },
  //   ]
  // }

  const barListRegionData = getBarListData(title, selectedYear)

  const formattedValue = formatNumber(value, metricType)
  const formattedPrevious = formatNumber(previous, metricType)
  const changeLabel =
    typeof value === "number" && typeof previous === "number"
      ? calculateChange(value, previous, metricType)
      : "N/A"

  const badgeVariant =
    typeof value === "number" && typeof previous === "number"
      ? determineBadgeVariant(title, value, previous)
      : "error"

  const filteredData = data.filter((item) => item.fiscal_year <= selectedYear)

  return (
    <div className="grid-col-1 grid">
      <div className="bg-white dark:bg-gray-800">
        <div>
          <div className="flex items-center">
            <h1 className="mr-2 text-sm font-bold text-gray-900 dark:text-gray-50">
              {title}
            </h1>
            <Badge variant={badgeVariant}>{changeLabel}</Badge>
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
              className="h-48"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Nike Brand by Region
            </p>
            <div className="mb-2 mt-2">
              <Divider className="mb-0 mt-0" />
            </div>

            <BarList
              data={barListRegionData}
              className="w-full text-sm"
              color="gray"
              showAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { AreaChart } from "@/components/AreaChart"
import { Badge } from "@/components/Badge"
import { BarList } from "@/components/BarList"
import { EbitRegion } from "@/data/ebit_data"
import { AvailableChartColorsKeys } from "@/lib/chartUtils"
import CountUp from "react-countup"

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
      return (
        <>
          $<CountUp end={num / 1_000} duration={1} />M
        </>
      )
    }

    return (
      <>
        <CountUp end={num} decimals={1} duration={1} />%
      </>
    )
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

    const regionOrder = [
      "North America",
      "Europe, Middle East & Africa",
      "Greater China",
      "Asia Pacific & Latin America",
    ]

    const regionsData = [
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

    return regionsData.sort((a, b) => {
      return regionOrder.indexOf(a.name) - regionOrder.indexOf(b.name)
    })
  }

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

  const chartColor: [AvailableChartColorsKeys] =
    badgeVariant === "success" ? ["emerald"] : ["red"]

  const getTooltipLegendColor = (color: string) => {
    switch (color) {
      case "red":
        return "red"
      case "emerald":
        return "#10b981"
    }
  }

  const Tooltip = ({ payload, active, label, metricType }: any) => {
    if (!active || !payload || payload.length === 0) return null

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

    const tooltipTitle = payload[0]?.payload?.title || "Details"

    return (
      <div className="rounded-lg border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <h3 className="pl-2 pr-2 pt-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
          {tooltipTitle}
        </h3>
        <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>
        {payload.map((item: any) => (
          <div
            key={item.name}
            className="flex items-center justify-between space-x-2 pb-2 pl-2 pr-2 text-sm"
          >
            <span className="pl-0 pr-0 text-gray-500 dark:text-gray-400">
              {item.name}
            </span>
            <span
              className="!ml-0 block h-1 w-4 rounded-full"
              style={{ backgroundColor: getTooltipLegendColor(item.color) }}
            ></span>
            <span className="pr-10">{label}</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {formatNumber(item.value, metricType)}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid-col-1 grid">
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
            className="h-36"
            showYAxis={false}
            startEndOnly={true}
            showLegend={false}
            colors={chartColor}
            autoMinValue={true}
            customTooltip={(props) => (
              <Tooltip {...props} metricType={metricType} />
            )}
          />
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
            NIKE Brand by Region
          </p>

          <BarList
            data={barListRegionData}
            valueFormatter={(value) => formatNumber(value, metricType)} // Works properly with error
            className="mt-4 w-full text-xs"
            showAnimation={true}
            sortOrder="none"
            backgroundColor="bg-gray-200 dark:bg-gray-800"
          />
        </div>
      </div>
    </div>
  )
}

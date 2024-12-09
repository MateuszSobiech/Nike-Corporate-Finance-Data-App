"use client"

import { Badge } from "@/components/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { EbitBrand, EbitRegion } from "@/data/ebit_data"
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

    // EBIT, EBIT Margin, and Revenue: Positive if increasing
    if (["EBIT", "EBIT Margin", "Revenue"].includes(title)) {
      return current > previous ? "success" : "error"
    }

    // OpEx and OpEx as % of Revenue: Positive if decreasing
    if (["Operating Expenses", "OpEx as % of Revenue"].includes(title)) {
      return current < previous ? "success" : "error"
    }

    return current >= previous ? "success" : "error"
  }

  const getBarListData = (
    title: string,
    selectedYear: number,
    isRegion: boolean,
  ) => {
    const dataSource = isRegion ? EbitRegion : EbitBrand
    const yearData = dataSource.find(
      (item) => item.fiscal_year === selectedYear,
    )

    if (!yearData) return []

    const segments = isRegion
      ? [
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
          {
            name: "Global Brand Divisions",
            value: yearData.global_value,
            previous: yearData.global_previous,
          },
        ]
      : [
          {
            name: "NIKE Brand",
            value: yearData.nike_value,
            previous: yearData.nike_previous,
          },
          {
            name: "Converse",
            value: yearData.converse_value,
            previous: yearData.converse_previous,
          },
          {
            name: "Corporate",
            value: yearData.corporate_value,
            previous: yearData.corporate_previous,
          },
        ]

    return segments.map((segment) => ({
      name: segment.name,
      value: formatNumber(segment.value, metricType),
      percentageChange: calculateChange(
        segment.value,
        segment.previous,
        metricType,
      ),
    }))
  }

  const barListRegionData = getBarListData(title, selectedYear, true)
  const barListBrandData = getBarListData(title, selectedYear, false)

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
            <Tabs defaultValue="byRegion">
              <TabsList>
                <TabsTrigger value="byRegion">By Region</TabsTrigger>
                <TabsTrigger value="byBrand">By Brand Divisions</TabsTrigger>
              </TabsList>
              <TabsContent value="byRegion">
                <BarList
                  data={barListRegionData}
                  className="w-full"
                  color="gray"
                  showAnimation={true}
                />
              </TabsContent>
              <TabsContent value="byBrand">
                <BarList
                  data={barListBrandData}
                  className="w-full"
                  color="gray"
                  showAnimation={true}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

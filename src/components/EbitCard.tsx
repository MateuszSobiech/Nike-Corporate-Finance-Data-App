"use client"

import { Badge } from "@/components/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { EbitNARevenues } from "@/data/ebit_data"
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

    // Default logic
    return current >= previous ? "success" : "error"
  }

  const getBarListData = (title: string, selectedYear: number) => {
    // Only fetch data for Revenues
    if (title !== "Revenues") return []

    const yearData = EbitNARevenues.find(
      (item) => item.fiscal_year === selectedYear,
    )
    if (!yearData) return []

    return [
      {
        name: "Footwear",
        value: yearData.footwear_value,
        previousValue: yearData.footwear_previous,
      },
      {
        name: "Apparel",
        value: yearData.apparel_value,
        previousValue: yearData.apparel_previous,
      },
      {
        name: "Equipment",
        value: yearData.equipment_value,
        previousValue: yearData.equipment_previous,
      },
      {
        name: "Total",
        value: yearData.total_value,
        previousValue: yearData.total_previous,
      },
    ].map((segment) => ({
      name: segment.name,
      value: formatNumber(segment.value, "currency"),
      percentageChange: calculateChange(
        segment.value,
        segment.previousValue,
        "currency",
      ),
    }))
  }

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

  const chartColor = badgeVariant === "success" ? "green-700" : "red-700"
  const areaChartClasses =
    badgeVariant === "success"
      ? "fill-green-500 stroke-green-700"
      : "fill-red-500 stroke-red-700"

  // Fetch bar list data for the "Revenues" card only
  const barListData = getBarListData(title, selectedYear)

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
              className={`h-48 ${areaChartClasses}`}
            />
          </div>
          <div className="mt-4">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">NA</TabsTrigger>
                <TabsTrigger value="tab2">EMEA</TabsTrigger>
                <TabsTrigger value="tab3">CN</TabsTrigger>
                <TabsTrigger value="tab4">APLA</TabsTrigger>
              </TabsList>
              <div className="ml-2 mt-4">
                <TabsContent
                  value="tab1"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  {title === "Revenues" && (
                    <BarList
                      data={barListData.map((item) => ({
                        name: item.name,
                        value: item.value,
                        change: item.percentageChange,
                      }))}
                      className="w-full"
                      color="gray"
                      showAnimation={true}
                    />
                  )}
                </TabsContent>
                <TabsContent
                  value="tab2"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <p>bar chart</p>
                </TabsContent>
                <TabsContent
                  value="tab3"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <p>bar chart</p>
                </TabsContent>
                <TabsContent
                  value="tab4"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <p>bar chart</p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card } from "@/components/Card"
import { DonutChart } from "@/components/DonutChart"
import { LineChart } from "@/components/LineChart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import {
  dataYears,
  nbDistChanneLineChart,
  nbDistChannelDonut,
  nbProductLineChart,
  nbProductLineDonut,
  nbRegionDonut,
  nbRegionLineChart,
  revenuesDonut,
} from "@/data/revenues"
import { useMemo, useState } from "react"

export default function RevenueCoR() {
  const [selectedYear, setSelectedYear] = useState(2024)

  const filteredData = revenuesDonut.filter(
    (item) => item.fiscal_year === selectedYear,
  )

  // Nike Brand Donut Chart Data
  const filteredNBProductLineData = nbProductLineDonut.filter(
    (item) => item.fiscal_year === selectedYear,
  )

  const filteredNBRegionData = nbRegionDonut.filter(
    (item) => item.fiscal_year === selectedYear,
  )

  const filteredNBDistChannelData = nbDistChannelDonut.filter(
    (item) => item.fiscal_year === selectedYear,
  )

  // Nike Brand Line Chart Data
  const filteredNBProductLineChartData = nbProductLineChart.filter(
    (item) => item.fiscal_year <= selectedYear,
  )

  const filteredNBRegionLineChartData = nbRegionLineChart.filter(
    (item) => item.fiscal_year <= selectedYear,
  )

  const filteredNBDistChannelLineChartData = nbDistChanneLineChart.filter(
    (item) => item.fiscal_year <= selectedYear,
  )

  const totalRevenue = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.value, 0),
    [filteredData],
  )

  // Filter data for NIKE Brand only
  const nikeBrandData = revenuesDonut.filter(
    (item) => item.name === "NIKE Brand",
  )

  // Current year revenue for NIKE Brand
  const currentNikeBrandRevenue =
    nikeBrandData.find((item) => item.fiscal_year === selectedYear)?.value || 0

  // Previous year revenue for NIKE Brand
  const previousNikeBrandRevenue =
    nikeBrandData.find((item) => item.fiscal_year === selectedYear - 1)
      ?.value || 0

  // Difference in revenue for NIKE Brand
  const nikeBrandRevenueDifference =
    currentNikeBrandRevenue - previousNikeBrandRevenue

  // Percentage difference in revenue for NIKE Brand
  const nikeBrandRevenueDifferencePercentage =
    previousNikeBrandRevenue !== 0
      ? (nikeBrandRevenueDifference / previousNikeBrandRevenue) * 100
      : 0

  // Sign for the difference in percentage
  const nikeBrandRevenueDifferencePercentageSign =
    nikeBrandRevenueDifference > 0
      ? "+"
      : nikeBrandRevenueDifference < 0
        ? "-"
        : ""

  // Sign for the difference
  const nikeBrandRevenueDifferenceSign =
    nikeBrandRevenueDifference > 0
      ? "+"
      : nikeBrandRevenueDifference < 0
        ? "-"
        : ""

  const categoryColors: {
    "NIKE Brand": string
    Converse: string
    Corporate: string
  } = {
    "NIKE Brand": "bg-orange-500 dark:bg-orange-500",
    Converse: "bg-gray-400 dark:bg-gray-500",
    Corporate: "bg-gray-900 dark:bg-gray-100",
  }

  const categoryProductLineColors: {
    Footwear: string
    Apparel: string
    Equipment: string
  } = {
    Footwear: "bg-orange-500 dark:bg-orange-500",
    Apparel: "bg-gray-400 dark:bg-gray-500",
    Equipment: "bg-gray-900 dark:bg-gray-100",
  }

  const categoryRegionColors: {
    "North America": string
    EMEA: string
    "Greater China": string
    APLA: string
  } = {
    "North America": "bg-orange-500 dark:bg-orange-500",
    EMEA: "bg-orange-200 dark:bg-orange-200",
    "Greater China": "bg-gray-400 dark:bg-gray-500",
    APLA: "bg-gray-900 dark:bg-gray-100",
  }

  const categoryDistChannelColors: {
    Wholesale: string
    "NIKE Direct": string
  } = {
    Wholesale: "bg-orange-500 dark:bg-orange-500",
    "NIKE Direct": "bg-gray-400 dark:bg-gray-500",
  }

  const formatToMillions = (value: number) => {
    const millions = Math.round(value / 1_000)

    return `$${millions.toLocaleString("en-US")}M`
  }

  // Nike Brand Line Charts
  const tooltipFormatter = (value: number) => formatToMillions(value)

  return (
    <div>
      <div className="space-y-10">
        {/* Revenues Section */}
        <section>
          <div className="sticky top-16 z-20 mt-4 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
            <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
              Revenues Highlights
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

          {/* Total Nike Inc. Revenues Donut Chart */}
          <Card className="mt-6 p-10">
            <div>
              <h3 className="mt-0 text-left text-lg font-medium text-gray-900 dark:text-gray-100">
                FY{selectedYear} NIKE Inc. Revenue Breakdown
              </h3>
              <div className="flex-end flex flex-row justify-between">
                <div className="flex flex-row">
                  <DonutChart
                    data={filteredData.map((item) => ({
                      ...item,
                      color:
                        categoryColors[
                          item.name as keyof typeof categoryColors
                        ] || "bg-gray-500",
                    }))}
                    category="name"
                    value="value"
                    className="mx-auto mt-8 h-24 w-24"
                    showTooltip={false}
                  />
                  <div className="ml-4 flex flex-col justify-end">
                    <p className="text-left text-lg font-semibold text-gray-900 dark:text-gray-50">
                      {formatToMillions(totalRevenue)}
                    </p>
                    <p className="text-left text-sm font-normal text-gray-500 dark:text-gray-300">
                      Total Revenues
                    </p>
                  </div>
                </div>

                <div className="flex-end mt-0 flex flex-row">
                  {filteredData.map((item, index) => {
                    const percentage = (
                      (item.value / totalRevenue) *
                      100
                    ).toFixed(1)
                    return (
                      <div key={index} className="ml-10 flex flex-col">
                        <div className="dark: !mt-0 flex items-center justify-end border-r border-gray-200 dark:border-gray-500">
                          <span className="mr-1 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                            {formatToMillions(item.value)}
                          </span>
                          <span className="mt-0 pr-4 text-right text-sm font-normal text-gray-600 dark:text-gray-300">
                            ({percentage}%)
                          </span>
                        </div>

                        <div className="flex items-center justify-end space-x-2">
                          <span
                            className={`h-3 w-3 rounded-sm border-r border-gray-200 dark:border-gray-500 ${categoryColors[item.name]}`}
                          />
                          <span className="border-r border-gray-200 pr-4 text-sm font-normal text-gray-600 dark:border-gray-500 dark:text-gray-300">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* NIKE Brand Revenue Highlights */}
          <div>
            <Card className="mt-6 px-0">
              <div className="px-6">
                <h2 className="pb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  FY{selectedYear} NIKE Brand Revenue Highlights
                </h2>
                <p className="pb-6 text-sm text-gray-500 dark:text-gray-400">
                  The following charts provide a detailed breakdown of NIKE
                  Brand revenues, categorized by major product line, region and
                  distribution channel, offering insights into the key drivers
                  of revenue performance.
                </p>
              </div>

              <Tabs defaultValue="tab1">
                <TabsList className="border-b border-gray-200 px-6 dark:border-gray-700">
                  <TabsTrigger value="tab1" className="text-sm">
                    Product Line
                  </TabsTrigger>
                  <TabsTrigger value="tab2" className="text-sm">
                    Region
                  </TabsTrigger>
                  <TabsTrigger value="tab3" className="text-sm">
                    Distribution Channel
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 px-6">
                  <p className="text-sm text-gray-500">
                    FY{selectedYear} Total NIKE Brand Revenue
                  </p>
                  <h1 className="mt-1 text-3xl font-medium">
                    {formatToMillions(
                      revenuesDonut
                        .filter(
                          (item) =>
                            item.fiscal_year === selectedYear &&
                            item.name === "NIKE Brand",
                        )
                        .reduce((sum, item) => sum + item.value, 0),
                    )}
                  </h1>
                  <div className="flex items-baseline">
                    <p
                      className={`mr-1 mt-1 text-sm font-medium ${
                        nikeBrandRevenueDifference > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {nikeBrandRevenueDifferenceSign}
                      {formatToMillions(Math.abs(nikeBrandRevenueDifference))} (
                      {nikeBrandRevenueDifferencePercentageSign}
                      {Math.abs(nikeBrandRevenueDifferencePercentage).toFixed(
                        1,
                      )}
                      %)
                    </p>
                    <p className="text-sm font-normal text-gray-500">
                      vs. FY{selectedYear - 1}
                    </p>
                  </div>
                </div>

                <div className="mt-4 px-6">
                  <TabsContent
                    value="tab1"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  >
                    <div className="grid grid-cols-12 gap-10">
                      {/* Donut Chart */}
                      <div className="col-span-4 col-start-1">
                        <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-gray-50">
                          FY{selectedYear} Total Revenues Breakdown
                        </h3>
                        <span className="text-xs">
                          excl. Global Brand Divisions
                        </span>
                        <div className="relative mx-auto mt-6 h-32 w-32 pb-6">
                          <DonutChart
                            data={filteredNBProductLineData.map((item) => ({
                              ...item,
                              color:
                                categoryProductLineColors[
                                  item.name as keyof typeof categoryProductLineColors
                                ] || "bg-gray-500",
                            }))}
                            category="name"
                            value="value"
                            showTooltip={false}
                            valueFormatter={(value) =>
                              `${formatToMillions(value)}`
                            }
                            className="h-32 w-32"
                            showLabel={true}
                          />
                        </div>
                        <p className="mt-8 flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Category
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Amount / Share
                          </span>
                        </p>
                        <div className="mt-4">
                          {filteredNBProductLineData.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between border-b border-gray-200 py-2 dark:border-gray-800"
                            >
                              <div className="flex items-center">
                                <span
                                  style={{
                                    backgroundColor:
                                      categoryProductLineColors[item.name] ||
                                      "#d1d5db",
                                  }}
                                />
                                <span
                                  className={`mr-2 h-3 w-3 rounded-sm border-r border-gray-200 dark:border-gray-500 ${categoryProductLineColors[item.name]}`}
                                />
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-200">
                                  {item.name}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 dark:text-gray-50">
                                  {formatToMillions(item.value)}
                                </span>
                                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                  {(
                                    (item.value /
                                      filteredNBProductLineData.reduce(
                                        (sum, i) => sum + i.value,
                                        0,
                                      )) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Line Chart */}
                      <div className="col-span-9 col-start-5">
                        <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-gray-50">
                          YoY Total Revenue Trends by Fiscal Year
                        </h3>
                        <span className="text-xs">
                          excl. Global Brand Divisions
                        </span>
                        <LineChart
                          className="mt-8"
                          data={filteredNBProductLineChartData.map((item) => ({
                            ...item,
                            color:
                              categoryProductLineColors[
                                item.name as keyof typeof categoryProductLineColors
                              ] || "bg-gray-500",
                          }))}
                          index="fiscal_year"
                          categories={["Footwear", "Apparel", "Equipment"]}
                          valueTooltipFormatter={tooltipFormatter}
                          valueFormatter={(value: number) =>
                            `$${(value / 1000000).toFixed(1)}B`
                          }
                          showLegend={false}
                          yAxisWidth={60}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="tab2"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  >
                    <div className="grid grid-cols-12 gap-10">
                      {/* Donut Chart */}
                      <div className="col-span-4 col-start-1">
                        <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-gray-50">
                          FY{selectedYear} Total Revenues Breakdown
                        </h3>
                        <span className="text-xs">
                          excl. Global Brand Divisions
                        </span>
                        <div className="relative mx-auto mt-6 h-32 w-32 pb-6">
                          <DonutChart
                            data={filteredNBRegionData.map((item) => ({
                              ...item,
                              color:
                                categoryRegionColors[
                                  item.name as keyof typeof categoryProductLineColors
                                ] || "bg-gray-500",
                            }))}
                            category="name"
                            value="value"
                            showTooltip={false}
                            valueFormatter={(value) =>
                              `${formatToMillions(value)}`
                            }
                            className="h-32 w-32"
                            showLabel={true}
                          />
                        </div>
                        <p className="mt-8 flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Category
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Amount / Share
                          </span>
                        </p>
                        <div className="mt-4">
                          {filteredNBRegionData.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between border-b border-gray-200 py-2 dark:border-gray-800"
                            >
                              <div className="flex items-center">
                                <span
                                  style={{
                                    backgroundColor:
                                      categoryRegionColors[item.name] ||
                                      "#d1d5db",
                                  }}
                                />
                                <span
                                  className={`mr-2 h-3 w-3 rounded-sm border-r border-gray-200 dark:border-gray-500 ${categoryRegionColors[item.name]}`}
                                />
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-200">
                                  {item.name}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 dark:text-gray-50">
                                  {formatToMillions(item.value)}
                                </span>
                                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                  {(
                                    (item.value /
                                      filteredNBRegionData.reduce(
                                        (sum, i) => sum + i.value,
                                        0,
                                      )) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Line Chart */}
                      <div className="col-span-9 col-start-5">
                        <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-gray-50">
                          YoY Total Revenue Trends by Fiscal Year
                        </h3>
                        <span className="text-xs">
                          excl. Global Brand Divisions
                        </span>
                        <LineChart
                          className="mt-8"
                          data={filteredNBRegionLineChartData.map((item) => ({
                            ...item,
                            color:
                              categoryRegionColors[
                                item.name as keyof typeof categoryLineColors
                              ] || "bg-gray-500",
                          }))}
                          index="fiscal_year"
                          categories={[
                            "North America",
                            "EMEA",
                            "Greater China",
                            "APLA",
                          ]}
                          valueTooltipFormatter={tooltipFormatter}
                          valueFormatter={(value: number) =>
                            `$${(value / 1000000).toFixed(1)}B`
                          }
                          showLegend={false}
                          yAxisWidth={60}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="tab3"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  >
                    <div className="grid grid-cols-12 gap-10">
                      {/* Donut Chart */}
                      <div className="col-span-4 col-start-1">
                        <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-gray-50">
                          FY{selectedYear} Total Revenues Breakdown
                        </h3>
                        <span className="text-xs">
                          excl. Global Brand Divisions
                        </span>
                        <div className="relative mx-auto mt-6 h-32 w-32 pb-6">
                          <DonutChart
                            data={filteredNBDistChannelData.map((item) => ({
                              ...item,
                              color:
                                categoryDistChannelColors[
                                  item.name as keyof typeof categoryProductLineColors
                                ] || "bg-gray-500",
                            }))}
                            category="name"
                            value="value"
                            showTooltip={false}
                            valueFormatter={(value) =>
                              `${formatToMillions(value)}`
                            }
                            className="h-32 w-32"
                            showLabel={true}
                          />
                        </div>
                        <p className="mt-8 flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Category
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Amount / Share
                          </span>
                        </p>
                        <div className="mt-4">
                          {filteredNBDistChannelData.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between border-b border-gray-200 py-2 dark:border-gray-800"
                            >
                              <div className="flex items-center">
                                <span
                                  style={{
                                    backgroundColor:
                                      categoryDistChannelColors[item.name] ||
                                      "#d1d5db",
                                  }}
                                />
                                <span
                                  className={`mr-2 h-3 w-3 rounded-sm border-r border-gray-200 dark:border-gray-500 ${categoryDistChannelColors[item.name]}`}
                                />
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-200">
                                  {item.name}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 dark:text-gray-50">
                                  {formatToMillions(item.value)}
                                </span>
                                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                  {(
                                    (item.value /
                                      filteredNBDistChannelData.reduce(
                                        (sum, i) => sum + i.value,
                                        0,
                                      )) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Line Chart */}
                      <div className="col-span-9 col-start-5">
                        <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-gray-50">
                          YoY Total Revenue Trends by Fiscal Year
                        </h3>
                        <span className="text-xs">
                          excl. Global Brand Divisions
                        </span>
                        <LineChart
                          className="mt-8"
                          data={filteredNBDistChannelLineChartData.map(
                            (item) => ({
                              ...item,
                              color:
                                categoryDistChannelColors[
                                  item.name as keyof typeof categoryDistChannelColors
                                ] || "bg-gray-500",
                            }),
                          )}
                          index="fiscal_year"
                          categories={["Wholesale", "NIKE Direct"]}
                          valueTooltipFormatter={tooltipFormatter}
                          valueFormatter={(value: number) =>
                            `$${(value / 1000000).toFixed(1)}B`
                          }
                          showLegend={false}
                          yAxisWidth={60}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* Disagreagation of Revenues */}
          <div>
            <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-gray-300">
              Disagregation of Revenues
            </h3>
          </div>
        </section>

        {/* Costs Section */}
        <section>
          <div className="sticky top-16 z-20 mt-4 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
            <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
              Cost of Revenues Breakdown
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
        </section>
      </div>
    </div>
  )
}

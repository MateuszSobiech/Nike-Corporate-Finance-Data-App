"use client"

import { Card } from "@/components/Card"
import { DonutChart } from "@/components/DonutChart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { dataYears, revenuesDonut } from "@/data/revenues"
import { useMemo, useState } from "react"

export default function RevenueCoR() {
  const [selectedYear, setSelectedYear] = useState(2024)

  const filteredData = revenuesDonut.filter(
    (item) => item.fiscal_year === selectedYear,
  )

  const previousYearData = revenuesDonut.filter(
    (item) => item.fiscal_year === selectedYear - 1,
  )

  const totalRevenue = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.value, 0),
    [filteredData],
  )

  const previousYearTotalRevenue = useMemo(
    () => previousYearData.reduce((sum, item) => sum + item.value, 0),
    [previousYearData],
  )

  const revenueDifference = totalRevenue - previousYearTotalRevenue
  const revenueDifferenceSign = revenueDifference > 0 ? "+" : "-"
  const revenueDifferencePercentage = previousYearTotalRevenue
    ? `${revenueDifferenceSign}${Math.abs(
        (revenueDifference / previousYearTotalRevenue) * 100,
      ).toFixed(1)}%`
    : "N/A"

  const categoryColors: {
    "NIKE Brand": string
    Converse: string
    Corporate: string
  } = {
    "NIKE Brand": "bg-orange-500 dark:bg-orange-500",
    Converse: "bg-gray-400 dark:bg-gray-500",
    Corporate: "bg-gray-900 dark:bg-gray-100",
  }

  const formatToMillions = (value: number) => {
    const millions = Math.round(value / 1_000)

    return `$${millions.toLocaleString("en-US")}M`
  }

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

          {/* Donut Chart */}
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
                            className={`h-3 w-3 rounded-[2px] border-r border-gray-200 dark:border-gray-500 ${categoryColors[item.name]}`}
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
            <Card className="mt-6">
              <h2 className="pb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                FY{selectedYear} NIKE Brand Revenue Highlights
              </h2>
              <p className="pb-6 text-sm text-gray-500 dark:text-gray-400">
                The following charts provide a detailed breakdown of NIKE Brand
                revenues, categorized by major product line, region and
                distribution channel, offering insights into the key drivers of
                revenue performance.
              </p>

              <Tabs defaultValue="tab1">
                <TabsList className="border-b border-gray-200 dark:border-gray-700">
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

                <div className="mt-6">
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
                        revenueDifference > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {revenueDifferenceSign}
                      {formatToMillions(Math.abs(revenueDifference))} (
                      {revenueDifferencePercentage})
                    </p>
                    <p className="text-sm font-normal text-gray-500">
                      vs. FY{selectedYear - 1}
                    </p>
                  </div>
                </div>

                <div className="ml-2 mt-4">
                  <TabsContent
                    value="tab1"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  ></TabsContent>

                  <TabsContent
                    value="tab2"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  ></TabsContent>

                  <TabsContent
                    value="tab3"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  ></TabsContent>
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

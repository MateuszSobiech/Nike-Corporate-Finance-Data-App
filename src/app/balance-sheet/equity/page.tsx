"use client"

import BalanceSheetKPIv2 from "@/components/BalanceSheetKPIv2"
import { Card } from "@/components/Card"
import { LineChart, TooltipProps } from "@/components/LineChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { assetsAndLiabilities } from "@/data/balance_sheet_data"
import React from "react"

const TotalEquity: React.FC = () => {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const payload = datas?.payload?.[0]?.payload

  const totalEquity =
    payload?.["Total equity"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Total equity"]
  const totalEquityData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Total equity"],
  }))

  const commonStock =
    payload?.["Common stock: Class B"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Common stock: Class B"
    ]
  const commonStockData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Common stock: Class B"],
  }))

  const capitalExcess =
    payload?.["Capital in excess of stated value"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Capital in excess of stated value"
    ]
  const capitalExcessData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Capital in excess of stated value"],
  }))

  const accumulatedIncome =
    payload?.["Accumulated other comprehensive income (loss)"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Accumulated other comprehensive income (loss)"
    ]
  const accumulatedIncomeData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Accumulated other comprehensive income (loss)"],
  }))

  const retainedEarnings =
    payload?.["Retained earnings (deficit)"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Retained earnings (deficit)"
    ]
  const retainedEarningsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Retained earnings (deficit)"],
  }))

  const formatToMillions = (value: number) => {
    const millions = Math.round(value / 1_000)

    return `$${millions.toLocaleString("en-US")}M`
  }

  const tooltipFormatter = (value: number) => formatToMillions(value)

  const previousYear =
    assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year

  const getYoYChange = (
    data: { fiscal_year: number; value: number }[],
    currentYear: number,
  ) => {
    const currentIndex = data.findIndex(
      (item) => item.fiscal_year === currentYear,
    )
    if (currentIndex <= 0) return 0
    const previousValue = data[currentIndex - 1].value
    const currentValue = data[currentIndex].value
    return previousValue !== 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : 0
  }

  return (
    <div className="pt-6">
      <Card className="mb-6">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          FY Trend: Total Equity & Top Categories of Equity
        </h2>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid">
            <TabsTrigger value="tab1">Total</TabsTrigger>
            <TabsTrigger value="tab2">Top Categories</TabsTrigger>
          </TabsList>
          <div className="ml-2 mt-8">
            <TabsContent
              value="tab1"
              className="flex space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={["Total equity"]}
                showLegend={false}
                showYAxis={true}
                startEndOnly={false}
                colors={["darkOrange"]}
                className="-mb-2 mt-4 h-96"
                valueTooltipFormatter={tooltipFormatter}
                valueFormatter={(value: number) =>
                  `$${(value / 1000000).toFixed(1)}B`
                }
                tooltipCallback={(props) => {
                  if (props.active) {
                    setDatas((prev) => {
                      if (prev?.label === props.label) return prev
                      return props
                    })
                  } else {
                    setDatas(null)
                  }
                  return null
                }}
              />
              <BalanceSheetKPIv2
                title="Total equity"
                amount={parseFloat(totalEquity.toFixed(2))}
                data={datas}
                dataSource={totalEquityData}
                previousYear={previousYear}
                dataFunction={getYoYChange}
                lightColor="bg-orange-500"
                darkColor="bg-orange-500"
              />
            </TabsContent>

            <TabsContent
              value="tab2"
              className="flex space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={[
                  "Capital in excess of stated value",
                  "Accumulated other comprehensive income (loss)",
                  "Retained earnings (deficit)",
                  "Common stock: Class B",
                ]}
                colors={["darkOrange", "lightOrange", "lightGray", "darkGray"]}
                showLegend={false}
                showYAxis={true}
                startEndOnly={false}
                className="-mb-2 mt-4 h-96"
                valueTooltipFormatter={tooltipFormatter}
                valueFormatter={(value: number) =>
                  `$${(value / 1000000).toFixed(1)}B`
                }
                tooltipCallback={(props) => {
                  if (props.active) {
                    setDatas((prev) => {
                      if (prev?.label === props.label) return prev
                      return props
                    })
                  } else {
                    setDatas(null)
                  }
                  return null
                }}
              />
              <div>
                <BalanceSheetKPIv2
                  title="Capital in excess of stated value"
                  amount={parseFloat(capitalExcess.toFixed(2))}
                  data={datas}
                  dataSource={capitalExcessData}
                  previousYear={previousYear}
                  dataFunction={getYoYChange}
                  lightColor="bg-orange-500"
                  darkColor="bg-orange-500"
                />
                <BalanceSheetKPIv2
                  title="Accumulated other comprehensive income (loss)"
                  amount={parseFloat(accumulatedIncome.toFixed(2))}
                  data={datas}
                  dataSource={accumulatedIncomeData}
                  previousYear={previousYear}
                  dataFunction={getYoYChange}
                  lightColor="bg-orange-300"
                  darkColor="bg-orange-300"
                />
                <BalanceSheetKPIv2
                  title="Retained earnings (deficit)"
                  amount={parseFloat(retainedEarnings.toFixed(2))}
                  data={datas}
                  dataSource={retainedEarningsData}
                  previousYear={previousYear}
                  dataFunction={getYoYChange}
                  lightColor="bg-gray-200"
                  darkColor="bg-gray-700"
                />
                <BalanceSheetKPIv2
                  title="Common stock: Class B"
                  amount={parseFloat(commonStock.toFixed(2))}
                  data={datas}
                  dataSource={commonStockData}
                  previousYear={previousYear}
                  dataFunction={getYoYChange}
                  lightColor="bg-gray-900"
                  darkColor="bg-gray-100"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}

export default TotalEquity

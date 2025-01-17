"use client"

import BalanceSheetKPIv1 from "@/components/BalanceSheetKPIv1"
import { Card } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { LineChart, TooltipProps } from "@/components/LineChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { assetsAndLiabilities } from "@/data/balance_sheet_data"
import React from "react"

const NonCurrentAssetsAndLiabilities: React.FC = () => {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const payload = datas?.payload?.[0]?.payload

  // Non-Current Assets
  const totalNonCurrentAssets =
    payload?.["Total non-current assets"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total non-current assets"
    ]
  const totalNonCurrentAssetsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Total non-current assets"],
  }))

  const propertyPlantEquipmnet =
    payload?.["Property, plant and equipment, net"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Property, plant and equipment, net"
    ]
  const propertyPlantEquipmnetData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Property, plant and equipment, net"],
  }))

  const operatingLeaseAssets =
    payload?.["Operating lease right-of-use assets, net"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Operating lease right-of-use assets, net"
    ]
  const operatingLeaseAssetsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Operating lease right-of-use assets, net"],
  }))

  const intangibleAsses =
    payload?.["Identifiable intangible assets, net"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Identifiable intangible assets, net"
    ]
  const intangibleAssesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Identifiable intangible assets, net"],
  }))

  const goodwill =
    payload?.["Goodwill"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Goodwill"]
  const goodwillData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Goodwill"],
  }))

  const deferredIncomeTaxesAndOtherAssets =
    payload?.["Deferred income taxes and other assets"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Deferred income taxes and other assets"
    ]
  const deferredIncomeTaxesAndOtherAssetsData = assetsAndLiabilities.map(
    (item) => ({
      fiscal_year: item.fiscal_year,
      value: item["Deferred income taxes and other assets"],
    }),
  )

  // Non-Current Liabilites
  const totalNonCurrentLiabilities =
    payload?.["Total non-current liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total non-current liabilities"
    ]
  const totalNonCurrentLiabilitiesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Total non-current liabilities"],
  }))

  const longTermDebt =
    payload?.["Long-term debt"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Long-term debt"]
  const longTermDebtData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Long-term debt"],
  }))

  const operatingLeaseLiabilities =
    payload?.["Operating lease liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Operating lease liabilities"
    ]
  const operatingLeaseLiabilitiesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Operating lease liabilities"],
  }))

  const deferredIncomeTaxesAndOtherLiabilities =
    payload?.["Deferred income taxes and other liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Deferred income taxes and other liabilities"
    ]
  const deferredIncomeTaxesAndOtherLiabilitiesData = assetsAndLiabilities.map(
    (item) => ({
      fiscal_year: item.fiscal_year,
      value: item["Deferred income taxes and other liabilities"],
    }),
  )

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
          FY Trend: Total Non-Current Assets & Top Categories of Current Assets
        </h2>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid">
            <TabsTrigger value="tab1">Total Non-Current Assets</TabsTrigger>
            <TabsTrigger value="tab2">
              Top Categories of Non-Current Assets
            </TabsTrigger>
          </TabsList>
          <div className="ml-2 mt-8">
            <TabsContent
              value="tab1"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <BalanceSheetKPIv1
                title="Total Non-Current Assets"
                amount={parseFloat(totalNonCurrentAssets.toFixed(2))}
                data={datas}
                dataSource={totalNonCurrentAssetsData}
                previousYear={previousYear}
                dataFunction={getYoYChange}
                lightColor="bg-orange-500"
                darkColor="bg-orange-500"
              />
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={["Total non-current assets"]}
                showLegend={false}
                showYAxis={true}
                startEndOnly={false}
                colors={["darkOrange"]}
                className="mt-8 h-80 pb-4"
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
            </TabsContent>
            <TabsContent
              value="tab2"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <div className="flex gap-12">
                <div>
                  <div className="flex">
                    <div className="flex flex-row gap-12">
                      <BalanceSheetKPIv1
                        title="Property, plant and equipment, net"
                        amount={parseFloat(propertyPlantEquipmnet.toFixed(2))}
                        data={datas}
                        dataSource={propertyPlantEquipmnetData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-orange-500"
                        darkColor="bg-orange-500"
                      />
                      <BalanceSheetKPIv1
                        title="Operating lease right-of-use assets, net"
                        amount={parseFloat(operatingLeaseAssets.toFixed(2))}
                        data={datas}
                        dataSource={operatingLeaseAssetsData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-orange-300"
                        darkColor="bg-orange-300"
                      />
                      <BalanceSheetKPIv1
                        title="Identifiable intangible assets, net"
                        amount={parseFloat(intangibleAsses.toFixed(2))}
                        data={datas}
                        dataSource={intangibleAssesData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-gray-900"
                        darkColor="bg-gray-100"
                      />
                      <BalanceSheetKPIv1
                        title="Goodwill"
                        amount={parseFloat(goodwill.toFixed(2))}
                        data={datas}
                        dataSource={goodwillData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-gray-400"
                        darkColor="bg-gray-500"
                      />
                      <BalanceSheetKPIv1
                        title="Deferred income taxes and other assets"
                        amount={parseFloat(
                          deferredIncomeTaxesAndOtherAssets.toFixed(2),
                        )}
                        data={datas}
                        dataSource={deferredIncomeTaxesAndOtherAssetsData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-gray-200"
                        darkColor="bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={[
                  "Property, plant and equipment, net",
                  "Operating lease right-of-use assets, net",
                  "Identifiable intangible assets, net",
                  "Goodwill",
                  "Deferred income taxes and other assets",
                ]}
                colors={[
                  "darkOrange",
                  "lightOrange",
                  "darkGray",
                  "mediumGray",
                  "lightGray",
                ]}
                showLegend={false}
                showYAxis={true}
                startEndOnly={false}
                className="mt-8 h-80 pb-4"
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
            </TabsContent>
          </div>
        </Tabs>

        <Divider />

        <h2 className="pb-8 pt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          FY Trend: Total Non-Current Liabilities & Top Categories of Current
          Liabilities
        </h2>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid">
            <TabsTrigger value="tab1">
              Total Non-Current Liabilities
            </TabsTrigger>
            <TabsTrigger value="tab2">
              Top Categories of Non-Current Liabilities
            </TabsTrigger>
          </TabsList>
          <div className="ml-2 mt-8">
            <TabsContent
              value="tab1"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <BalanceSheetKPIv1
                title="Total Non-Current Liabilitie"
                amount={parseFloat(totalNonCurrentLiabilities.toFixed(2))}
                data={datas}
                dataSource={totalNonCurrentLiabilitiesData}
                previousYear={previousYear}
                dataFunction={getYoYChange}
                lightColor="bg-orange-500"
                darkColor="bg-orange-500"
              />
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={["Total non-current liabilities"]}
                showLegend={false}
                showYAxis={true}
                startEndOnly={false}
                colors={["darkOrange"]}
                className="-mb-2 mt-8 h-80"
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
            </TabsContent>

            <TabsContent
              value="tab2"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <div className="flex gap-12">
                <div>
                  <div className="flex">
                    <div className="flex flex-row gap-12">
                      <BalanceSheetKPIv1
                        title="Long-term debt"
                        amount={parseFloat(longTermDebt.toFixed(2))}
                        data={datas}
                        dataSource={longTermDebtData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-orange-500"
                        darkColor="bg-orange-500"
                      />
                      <BalanceSheetKPIv1
                        title="Operating lease liabilities"
                        amount={parseFloat(
                          operatingLeaseLiabilities.toFixed(2),
                        )}
                        data={datas}
                        dataSource={operatingLeaseLiabilitiesData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-gray-900"
                        darkColor="bg-gray-100"
                      />
                      <BalanceSheetKPIv1
                        title="Deferred income taxes and other liabilities"
                        amount={parseFloat(
                          deferredIncomeTaxesAndOtherLiabilities.toFixed(2),
                        )}
                        data={datas}
                        dataSource={deferredIncomeTaxesAndOtherLiabilitiesData}
                        previousYear={previousYear}
                        dataFunction={getYoYChange}
                        lightColor="bg-gray-200"
                        darkColor="bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={[
                  "Long-term debt",
                  "Operating lease liabilities",
                  "Deferred income taxes and other liabilities",
                ]}
                colors={["darkOrange", "darkGray", "lightGray"]}
                showLegend={false}
                showYAxis={true}
                startEndOnly={false}
                className="-mb-2 mt-8 h-80"
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
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}

export default NonCurrentAssetsAndLiabilities

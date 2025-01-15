"use client"

import { Card } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { LineChart, TooltipProps } from "@/components/LineChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { assetsAndLiabilities } from "@/data/balance_sheet_data"
import React from "react"
import CountUp from "react-countup"

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
              <div className="mb-10 flex gap-12">
                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-500"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Total Non-Current Assets
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(totalNonCurrentAssets.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            totalNonCurrentAssetsData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          end={
                            datas
                              ? getYoYChange(
                                  totalNonCurrentAssetsData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  totalNonCurrentAssetsData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          duration={1}
                          formattingFn={(value) =>
                            `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
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
              <div className="mb-10 flex gap-12">
                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-500"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Property, plant and equipment, net
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={
                        parseFloat(propertyPlantEquipmnet.toFixed(2)) / 1_000
                      }
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            propertyPlantEquipmnetData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  propertyPlantEquipmnetData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  propertyPlantEquipmnetData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-300"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Operating lease right-of-use assets, net
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(operatingLeaseAssets.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            operatingLeaseAssetsData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  operatingLeaseAssetsData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  operatingLeaseAssetsData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-gray-900 dark:bg-gray-100"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Identifiable intangible assets, net
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(intangibleAsses.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            intangibleAssesData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  intangibleAssesData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  intangibleAssesData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-gray-400 dark:bg-gray-500"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Goodwill
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(goodwill.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            goodwillData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  goodwillData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  goodwillData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-gray-200 dark:bg-gray-700"></span>
                    <p className="mr-24 text-xs text-gray-700 dark:text-gray-300">
                      Deferred income taxes and other assets
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={
                        parseFloat(
                          deferredIncomeTaxesAndOtherAssets.toFixed(2),
                        ) / 1_000
                      }
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            deferredIncomeTaxesAndOtherAssetsData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  deferredIncomeTaxesAndOtherAssetsData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  deferredIncomeTaxesAndOtherAssetsData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
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
              <div className="mb-10 flex gap-12">
                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-500"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Total Non-Current Liabilities
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={
                        parseFloat(totalNonCurrentLiabilities.toFixed(2)) /
                        1_000
                      }
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            totalNonCurrentLiabilitiesData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          end={
                            datas
                              ? getYoYChange(
                                  totalNonCurrentLiabilitiesData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  totalNonCurrentLiabilitiesData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          duration={1}
                          formattingFn={(value) =>
                            `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
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
              <div className="mb-10 flex gap-12">
                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-700 dark:bg-orange-100"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Long-term debt
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(longTermDebt.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            longTermDebtData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  longTermDebtData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  longTermDebtData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-500"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Operating lease liabilities
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={
                        parseFloat(operatingLeaseLiabilities.toFixed(2)) / 1_000
                      }
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            operatingLeaseLiabilitiesData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  operatingLeaseLiabilitiesData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  operatingLeaseLiabilitiesData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-300"></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Deferred income taxes and other liabilities
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
                      end={
                        parseFloat(
                          deferredIncomeTaxesAndOtherLiabilities.toFixed(2),
                        ) / 1_000
                      }
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-xs">
                      <span
                        className={`${
                          getYoYChange(
                            deferredIncomeTaxesAndOtherLiabilitiesData,
                            datas?.payload?.[0]?.payload?.fiscal_year ??
                              assetsAndLiabilities[
                                assetsAndLiabilities.length - 1
                              ].fiscal_year,
                          ) >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        <CountUp
                          start={0}
                          end={
                            datas
                              ? getYoYChange(
                                  deferredIncomeTaxesAndOtherLiabilitiesData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  deferredIncomeTaxesAndOtherLiabilitiesData,
                                  assetsAndLiabilities[
                                    assetsAndLiabilities.length - 1
                                  ].fiscal_year,
                                )
                          }
                          decimals={1}
                          suffix="%"
                          formattingFn={(value) =>
                            `${
                              value > 0 ? "+" : ""
                            }${value.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`
                          }
                        />
                      </span>
                      <span className="text-gray-500">
                        {datas
                          ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                          : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                      </span>
                    </p>
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

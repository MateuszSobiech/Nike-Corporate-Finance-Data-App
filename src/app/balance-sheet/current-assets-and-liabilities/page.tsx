"use client"

import { Card } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { LineChart, TooltipProps } from "@/components/LineChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { assetsAndLiabilities } from "@/data/balance_sheet_data"
import React from "react"
import CountUp from "react-countup"

const CurrentAssetsAndLiabilities: React.FC = () => {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const payload = datas?.payload?.[0]?.payload

  // Current Assets
  const totalCurrentAssets =
    payload?.["Total current assets"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total current assets"
    ]
  const cashAndEquivalents =
    payload?.["Cash and equivalents"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Cash and equivalents"
    ]
  const shortTermInvestments =
    payload?.["Short-term investments"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Short-term investments"
    ]
  const accountsReceivable =
    payload?.["Accounts receivable, net"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Accounts receivable, net"
    ]
  const inventories =
    payload?.["Inventories"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Inventories"]
  const prepaidExpenses =
    payload?.["Prepaid expenses"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Prepaid expenses"]

  // Current Liabilites
  const totalCurrentLiabilities =
    payload?.["Total current liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total current liabilities"
    ]
  const currentPortionOfLongTermDebt =
    payload?.["Current portion of long-term debt"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Current portion of long-term debt"
    ]
  const notesPayable =
    payload?.["Notes payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Notes payable"]
  const accountsPayable =
    payload?.["Accounts payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Accounts payable"]
  const currentPortionOfOperatingLeaseLiabilities =
    payload?.["Current portion of operating lease liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Current portion of operating lease liabilities"
    ]
  const accruedLiabilities =
    payload?.["Accrued liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Accrued liabilities"]
  const incomeTaxesPayable =
    payload?.["Income taxes payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Income taxes payable"
    ]

  const totalCurrentAssetsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Total current assets"],
  }))

  const cashAndEquivalentsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Cash and equivalents"],
  }))

  const shortTermInvestmentsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Short-term investments"],
  }))

  const accountsReceivableData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Accounts receivable, net"],
  }))

  const inventoriesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Inventories"],
  }))

  const prepaidExpencesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Prepaid expenses"],
  }))

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
    if (currentIndex <= 0) return 0 // No YoY change for the first year or invalid year
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
          FY Trend: Total Current Assets & Top Categories of Current Assets
        </h2>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid">
            <TabsTrigger value="tab1">Total Current Assets</TabsTrigger>
            <TabsTrigger value="tab2">
              Top Categories of Current Assets
            </TabsTrigger>
          </TabsList>
          <div className="ml-2 mt-8">
            <TabsContent
              value="tab1"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <div className="mb-10 flex gap-12">
                <div>
                  <div className="flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-500"></span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Total Current Assets
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(totalCurrentAssets.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-sm">
                      <span
                        className={`${
                          getYoYChange(
                            totalCurrentAssetsData,
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
                                  totalCurrentAssetsData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  totalCurrentAssetsData,
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
                categories={["Total current assets"]}
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
                  <div className="flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-500"></span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Cash and equivalents
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(cashAndEquivalents.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-sm">
                      <span
                        className={`${
                          getYoYChange(
                            cashAndEquivalentsData,
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
                                  cashAndEquivalentsData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  cashAndEquivalentsData,
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
                  <div className="flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-orange-300"></span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Short-term investments
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(shortTermInvestments.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-sm">
                      <span
                        className={`${
                          getYoYChange(
                            shortTermInvestmentsData,
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
                                  shortTermInvestmentsData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  shortTermInvestmentsData,
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
                  <div className="flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-gray-900 dark:bg-gray-100"></span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Accounts receivable, net
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(accountsReceivable.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-sm">
                      <span
                        className={`${
                          getYoYChange(
                            accountsReceivableData,
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
                                  accountsReceivableData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  accountsReceivableData,
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
                  <div className="flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-gray-400 dark:bg-gray-500"></span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Inventories
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(inventories.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-sm">
                      <span
                        className={`${
                          getYoYChange(
                            inventoriesData,
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
                                  inventoriesData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  inventoriesData,
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
                  <div className="flex items-center">
                    <span className="mr-2 h-1 w-4 rounded bg-gray-200 dark:bg-gray-700"></span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Prepaid expenses
                    </p>
                  </div>
                  <div>
                    <CountUp
                      className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50"
                      end={parseFloat(prepaidExpenses.toFixed(2)) / 1_000}
                      duration={1}
                      formattingFn={(value) =>
                        `$${value.toLocaleString("en-US")}M`
                      }
                    />
                    <p className="text-sm">
                      <span
                        className={`${
                          getYoYChange(
                            prepaidExpencesData,
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
                                  prepaidExpencesData,
                                  datas?.payload?.[0]?.payload?.fiscal_year,
                                )
                              : getYoYChange(
                                  prepaidExpencesData,
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
                  "Cash and equivalents",
                  "Short-term investments",
                  "Accounts receivable, net",
                  "Inventories",
                  "Prepaid expenses",
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

        <Divider />
        <h2 className="pb-8 pt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          FY Trend: Total Current Liabilities & Top Categories of Current
          Liabilities
        </h2>
        <div className="flex gap-12">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Demand Creation Expense
            </p>
            {/* <div>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedDemandExpense}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      demandCreationData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          demandCreationData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(demandCreationData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          demandCreationData,
                          expenseCombined[expenseCombined.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        demandCreationData,
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${expenseCombined[expenseCombined.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div> */}
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Operating Overhead Expense
            </p>
            {/* <div>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedOverheadExpense}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      overheadData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          overheadData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(overheadData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          overheadData,
                          expenseCombined[expenseCombined.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        overheadData,
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${expenseCombined[expenseCombined.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div> */}
          </div>
        </div>
        {/* <LineChart /> */}
      </Card>
    </div>
  )
}

export default CurrentAssetsAndLiabilities

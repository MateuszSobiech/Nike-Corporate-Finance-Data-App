"use client"

import BalanceSheetKPIv1 from "@/components/BalanceSheetKPIv1"
import { Card } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { LineChart, TooltipProps } from "@/components/LineChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import { assetsAndLiabilities } from "@/data/balance_sheet_data"
import React from "react"

const CurrentAssetsAndLiabilities: React.FC = () => {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const payload = datas?.payload?.[0]?.payload

  // Current Assets
  const totalCurrentAssets =
    payload?.["Total current assets"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total current assets"
    ]
  const totalCurrentAssetsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Total current assets"],
  }))

  const cashAndEquivalents =
    payload?.["Cash and equivalents"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Cash and equivalents"
    ]
  const cashAndEquivalentsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Cash and equivalents"],
  }))

  const shortTermInvestments =
    payload?.["Short-term investments"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Short-term investments"
    ]
  const shortTermInvestmentsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Short-term investments"],
  }))

  const accountsReceivable =
    payload?.["Accounts receivable, net"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Accounts receivable, net"
    ]
  const accountsReceivableData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Accounts receivable, net"],
  }))

  const inventories =
    payload?.["Inventories"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Inventories"]
  const inventoriesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Inventories"],
  }))

  const prepaidExpenses =
    payload?.["Prepaid expenses"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Prepaid expenses"]
  const prepaidExpencesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Prepaid expenses"],
  }))

  // Current Liabilites
  const totalCurrentLiabilities =
    payload?.["Total current liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total current liabilities"
    ]
  const totalCurrentLiabilitiesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Total current liabilities"],
  }))

  const currentPortionOfLongTermDebt =
    payload?.["Long-term debt"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Long-term debt"]
  const currentPortionOfLongTermDebtData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Long-term debt"],
  }))

  const notesPayable =
    payload?.["Notes payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Notes payable"]
  const notesPayableData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Notes payable"],
  }))

  const accountsPayable =
    payload?.["Accounts payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Accounts payable"]
  const accountsPayableData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Accounts payable"],
  }))

  const currentPortionOfOperatingLeaseLiabilities =
    payload?.["Operating lease liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Operating lease liabilities"
    ]
  const currentPortionOfOperatingLeaseLiabilitieseData =
    assetsAndLiabilities.map((item) => ({
      fiscal_year: item.fiscal_year,
      value: item["Accounts payable"],
    }))

  const accruedLiabilities =
    payload?.["Accrued liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Accrued liabilities"]
  const accruedLiabilitieseData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Accrued liabilities"],
  }))

  const incomeTaxesPayable =
    payload?.["Income taxes payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Income taxes payable"
    ]
  const incomeTaxesPayableData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Income taxes payable"],
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
              <BalanceSheetKPIv1
                title="Total Current Assets"
                amount={parseFloat(totalCurrentAssets.toFixed(2))}
                data={datas}
                dataSource={totalCurrentAssetsData}
                previousYear={previousYear}
                dataFunction={getYoYChange}
                lightColor="bg-orange-500"
                darkColor="bg-orange-500"
              />
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={["Total current assets"]}
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
              <div className="flex">
                <div className="flex flex-row gap-12">
                  <BalanceSheetKPIv1
                    title="Cash and equivalents"
                    amount={parseFloat(cashAndEquivalents.toFixed(2))}
                    data={datas}
                    dataSource={cashAndEquivalentsData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-orange-500"
                    darkColor="bg-orange-500"
                  />
                  <BalanceSheetKPIv1
                    title="Short-term investments"
                    amount={parseFloat(shortTermInvestments.toFixed(2))}
                    data={datas}
                    dataSource={shortTermInvestmentsData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-orange-300"
                    darkColor="bg-orange-300"
                  />
                  <BalanceSheetKPIv1
                    title="Accounts receivable, net"
                    amount={parseFloat(accountsReceivable.toFixed(2))}
                    data={datas}
                    dataSource={accountsReceivableData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-gray-900"
                    darkColor="bg-gray-100"
                  />
                  <BalanceSheetKPIv1
                    title="Inventories"
                    amount={parseFloat(inventories.toFixed(2))}
                    data={datas}
                    dataSource={inventoriesData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-gray-400"
                    darkColor="bg-gray-500"
                  />
                  <BalanceSheetKPIv1
                    title="Prepaid expenses"
                    amount={parseFloat(prepaidExpenses.toFixed(2))}
                    data={datas}
                    dataSource={prepaidExpencesData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-gray-200"
                    darkColor="bg-gray-700"
                  />
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
          FY Trend: Total Current Liabilities & Top Categories of Current
          Liabilities
        </h2>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid">
            <TabsTrigger value="tab1">Total Current Liabilities</TabsTrigger>
            <TabsTrigger value="tab2">
              Top Categories of Current Liabilities
            </TabsTrigger>
          </TabsList>
          <div className="ml-2 mt-8">
            <TabsContent
              value="tab1"
              className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
            >
              <BalanceSheetKPIv1
                title="Total Current Liabilities"
                amount={parseFloat(totalCurrentLiabilities.toFixed(2))}
                data={datas}
                dataSource={totalCurrentLiabilitiesData}
                previousYear={previousYear}
                dataFunction={getYoYChange}
                lightColor="bg-orange-500"
                darkColor="bg-orange-500"
              />
              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={["Total current liabilities"]}
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
              <div className="flex">
                <div className="flex flex-row gap-12">
                  <BalanceSheetKPIv1
                    title="Long-term debt"
                    amount={parseFloat(currentPortionOfLongTermDebt.toFixed(2))}
                    data={datas}
                    dataSource={currentPortionOfLongTermDebtData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-orange-700"
                    darkColor="bg-orange-100"
                  />
                  <BalanceSheetKPIv1
                    title="Notes payable"
                    amount={parseFloat(notesPayable.toFixed(2))}
                    data={datas}
                    dataSource={notesPayableData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-orange-500"
                    darkColor="bg-orange-500"
                  />
                  <BalanceSheetKPIv1
                    title="Accounts payable"
                    amount={parseFloat(accountsPayable.toFixed(2))}
                    data={datas}
                    dataSource={accountsPayableData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-orange-300"
                    darkColor="bg-orange-300"
                  />
                  <BalanceSheetKPIv1
                    title="Operating lease liabilities"
                    amount={parseFloat(
                      currentPortionOfOperatingLeaseLiabilities.toFixed(2),
                    )}
                    data={datas}
                    dataSource={currentPortionOfOperatingLeaseLiabilitieseData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-gray-900"
                    darkColor="bg-gray-100"
                  />
                  <BalanceSheetKPIv1
                    title="Accrued liabilities"
                    amount={parseFloat(accruedLiabilities.toFixed(2))}
                    data={datas}
                    dataSource={accruedLiabilitieseData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-gray-400"
                    darkColor="bg-gray-500"
                  />
                  <BalanceSheetKPIv1
                    title="Income taxes payable"
                    amount={parseFloat(incomeTaxesPayable.toFixed(2))}
                    data={datas}
                    dataSource={incomeTaxesPayableData}
                    previousYear={previousYear}
                    dataFunction={getYoYChange}
                    lightColor="bg-gray-200"
                    darkColor="bg-gray-700"
                  />
                </div>
              </div>

              <LineChart
                data={assetsAndLiabilities}
                index="fiscal_year"
                categories={[
                  "Long-term debt",
                  "Notes payable",
                  "Accounts payable",
                  "Operating lease liabilities",
                  "Accrued liabilities",
                  "Income taxes payable",
                ]}
                colors={[
                  "mediumOrange",
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
      </Card>
    </div>
  )
}

export default CurrentAssetsAndLiabilities

"use client"

import { BarList } from "@/components/BarList"
import { Card } from "@/components/Card"
import { ComboChart, type TooltipProps } from "@/components/ComboChart"
import { Divider } from "@/components/Divider"
import { demandCreation, operatingOverhead, opexTotal } from "@/data/opex_data"
import React from "react"

const OperatingExpenses: React.FC = () => {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const currencyFormatter = (number: number) =>
    `$${(number / 1_000_000).toLocaleString("en-US")}M`

  const percentageFormatter = (number: number) => `${number.toFixed(1)}%`

  const calculateYoYChange = (data: { value: number }[]) => {
    return data.map((item, index) => {
      if (index === 0) return { ...item, change: 0 } // No YoY change for the first item
      const previousValue = data[index - 1].value
      const change = ((item.value - previousValue) / previousValue) * 100
      return { ...item, change }
    })
  }

  // Apply YoY calculation to both datasets
  const demandCreationWithYoY = calculateYoYChange(demandCreation)
  const operatingOverheadWithYoY = calculateYoYChange(operatingOverhead)

  const payload = datas?.payload?.[0]?.payload

  const totalSellingExpense =
    payload?.["Total Selling and Admin Expense"] ??
    opexTotal[opexTotal.length - 1]["Total Selling and Admin Expense"]
  const percentOfRevenue =
    payload?.["% of Revenues"] ??
    opexTotal[opexTotal.length - 1]["% of Revenues"]

  const formattedSellingExpense = currencyFormatter(totalSellingExpense)
  const formattedPercentRevenue = percentageFormatter(percentOfRevenue)

  return (
    <div className="pt-6">
      <Card>
        <h2 className="pb-8 text-lg font-medium text-gray-900 dark:text-gray-100">
          FY Trend: Total Selling & Admin Expenses vs. Revenue Percentage
        </h2>
        <div className="flex gap-8">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Total Selling and Admin Expense
            </p>
            <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
              {formattedSellingExpense}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              % of Revenues
            </p>
            <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
              {formattedPercentRevenue}
            </p>
          </div>
        </div>
        <ComboChart
          data={opexTotal}
          index="fiscal_year"
          enableBiaxial={true}
          barSeries={{
            colors: ["lightGray"],
            categories: ["Total Selling and Admin Expense"],
            valueFormatter: (v) => currencyFormatter(v),
          }}
          lineSeries={{
            colors: ["orange"],
            categories: ["% of Revenues"],
            valueFormatter: (v) => percentageFormatter(v),
          }}
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
        <Divider />
        <div className="grid grid-cols-2 gap-16">
          <div>
            <BarList
              data={demandCreationWithYoY.map((item) => ({
                name: item.name, // Use the existing name field or create a new one
                value: `${currencyFormatter(item.value)} (${percentageFormatter(item.change)})`,
              }))}
              valueFormatter={currencyFormatter}
              className="mt-4 w-full text-xs"
              showAnimation={true}
              sortOrder="none"
              backgroundColor="bg-gray-200 dark:bg-gray-700"
            />
          </div>
          <div>
            <BarList
              data={operatingOverheadWithYoY.map((item) => ({
                ...item,
                value: `${currencyFormatter(item.value)} (${percentageFormatter(item.change)})`,
              }))}
              valueFormatter={currencyFormatter}
              className="mt-4 w-full text-xs"
              showAnimation={true}
              sortOrder="none"
              backgroundColor="bg-gray-200 dark:bg-gray-700"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default OperatingExpenses

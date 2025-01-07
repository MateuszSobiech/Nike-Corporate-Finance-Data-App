"use client"

import { BarChart } from "@/components/BarChart"
import { Card } from "@/components/Card"
import { ComboChart, type TooltipProps } from "@/components/ComboChart"
import { Divider } from "@/components/Divider"
import { expenseCombined, opexTotal } from "@/data/opex_data"
import React from "react"

const OperatingExpenses: React.FC = () => {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const currencyFormatter = (number: number) =>
    `$${(number / 1_000_000).toLocaleString("en-US", { minimumFractionDigits: 1 })}M`

  const percentageFormatter = (number: number) => `${number.toFixed(1)}%`

  const payload = datas?.payload?.[0]?.payload

  const totalSellingExpense =
    payload?.["Total Selling and Admin Expense"] ??
    opexTotal[opexTotal.length - 1]["Total Selling and Admin Expense"]
  const percentOfRevenue =
    payload?.["% of Revenues"] ??
    opexTotal[opexTotal.length - 1]["% of Revenues"]

  const formattedSellingExpense = currencyFormatter(totalSellingExpense)
  const formattedPercentRevenue = percentageFormatter(percentOfRevenue)

  const totalDemandExpense =
    payload?.["Demand Creation Expense"] ??
    expenseCombined[expenseCombined.length - 1]["Demand Creation Expense"]
  const totalOverheadExpense =
    payload?.["Operating Overhead Expense"] ??
    expenseCombined[expenseCombined.length - 1]["Operating Overhead Expense"]

  const formattedDemandExpense = currencyFormatter(totalDemandExpense)
  const formattedOverheadExpense = currencyFormatter(totalOverheadExpense)

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
    return ((currentValue - previousValue) / previousValue) * 100
  }

  const demandCreationData = expenseCombined.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Demand Creation Expense"],
  }))

  const overheadData = expenseCombined.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Operating Overhead Expense"],
  }))

  return (
    <div className="pt-6">
      <Card className="mb-6">
        <h2 className="pb-8 text-lg font-medium text-gray-900 dark:text-gray-100">
          FY Trend: Total Selling & Admin Expenses vs. Revenue Percentage
        </h2>
        <div className="flex gap-12">
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
        <h2 className="pb-8 pt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          Breakdown of Selling & Admin Expenses: Demand Creation vs. Operating
          Overhead
        </h2>
        <div className="flex gap-12">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Demand Creation Expense
            </p>
            <div>
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
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Operating Overhead Expense
            </p>
            <div>
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
            </div>
          </div>
        </div>
        <BarChart
          className="h-80"
          data={expenseCombined}
          index="fiscal_year"
          categories={["Demand Creation Expense", "Operating Overhead Expense"]}
          colors={["darkOrange", "lightOrange"]}
          valueFormatter={(v) => `${currencyFormatter(v)}`}
          showLegend={true}
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
      </Card>
    </div>
  )
}

export default OperatingExpenses

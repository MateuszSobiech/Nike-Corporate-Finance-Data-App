import React from "react"

interface FinancialItemProps {
  title: string
  amount: number
  data: any
  dataSource: any[]
  previousYear: number
  dataFunction: (data: any[], year: number) => number
  lightColor: string
  darkColor: string
  type: "assets" | "liabilities"
}

const BalanceSheetKPIv1: React.FC<FinancialItemProps> = ({
  title,
  amount,
  data,
  dataSource,
  previousYear,
  dataFunction,
  lightColor,
  darkColor,
  type,
}) => {
  const yearChange = dataFunction(
    dataSource,
    data?.payload?.[0]?.payload?.fiscal_year ?? previousYear,
  )

  const yearChangeColor =
    type === "assets"
      ? yearChange >= 0
        ? "text-emerald-500"
        : "text-red-500"
      : yearChange >= 0
        ? "text-red-500"
        : "text-emerald-500"

  return (
    <div className="mb-2 flex">
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <span
            className={`mr-2 h-5 w-1 rounded ${lightColor} dark:${darkColor}`}
          ></span>
          <p className="text-sm text-gray-700 dark:text-gray-300">{title}</p>
        </div>
        <div className="text-end">
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50">
            {`$${(amount / 1_000).toLocaleString("en-US")}M`}
          </p>
          <p className="text-xs">
            <span className={`${yearChangeColor} font-semibold`}>
              {`${yearChange > 0 ? "+" : ""}${yearChange.toFixed(1)}%`}
            </span>
            <span className="text-gray-500">
              {data
                ? ` vs. FY${data?.payload?.[0]?.payload?.fiscal_year - 1}`
                : ` vs. FY${previousYear - 1}`}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BalanceSheetKPIv1

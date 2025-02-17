import React from "react"

interface FinancialItemProps {
  title: string
  amount: number
  data: any
  dataSource: any[]
  previousYear: number
  dataFunction: (data: any[], year: number) => number
  lightColor: string // Light mode color
  darkColor: string // Dark mode color
}

const BalanceSheetKPIv2: React.FC<FinancialItemProps> = ({
  title,
  amount,
  data,
  dataSource,
  previousYear,
  dataFunction,
  lightColor, // Destructure light mode color
  darkColor, // Destructure dark mode color
}) => {
  const yearChange = dataFunction(
    dataSource,
    data?.payload?.[0]?.payload?.fiscal_year ?? previousYear,
  )

  return (
    <div className="mb-6 flex">
      <div className="ml-12">
        <div className="flex items-center">
          <span
            className={`mr-2 h-5 w-1 rounded ${lightColor} dark:${darkColor}`}
          ></span>
          <p className="w-44 text-xs text-gray-700 dark:text-gray-300">
            {title}
          </p>
        </div>
        <div>
          <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
            {`$${(amount / 1_000).toLocaleString("en-US")}M`}
          </p>
          <p className="text-xs">
            <span
              className={`${
                yearChange >= 0 ? "text-emerald-500" : "text-red-500"
              } font-semibold`}
            >
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

export default BalanceSheetKPIv2

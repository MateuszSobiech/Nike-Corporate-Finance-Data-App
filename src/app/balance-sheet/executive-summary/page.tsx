"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import WaterfallBalanceSheet from "@/components/WaterfallBalanceSheet"
import { dataYears, waterfallBalanceSheet } from "@/data/balance_sheet_data"
import { useState } from "react"

export default function ExecutiveSummary() {
  const [selectedYear, setSelectedYear] = useState(2024)

  return (
    <div>
      <div>
        <div className="sticky top-0 z-20 mt-4 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
          <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
            Working Capital & Equity Highlights
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
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex">
          <div className="flex-1 pr-7">
            <h3 className="mb-2 text-left text-lg font-medium text-gray-900 dark:text-gray-100">
              Working Capital
            </h3>
            <WaterfallBalanceSheet
              selectedYear={selectedYear}
              dataset={waterfallBalanceSheet}
              categories={[
                { name: "Total Current Assets", field: "total_current_assets" },
                {
                  name: "Total Current Liabilities",
                  field: "total_current_liabilities",
                },
                { name: "Net Working Capital", field: "net_working_capital" },
              ]}
            />
          </div>
          <div className="flex-1 pl-7">
            <h3 className="mb-2 text-left text-lg font-medium text-gray-900 dark:text-gray-100">
              Total Equity
            </h3>
            <WaterfallBalanceSheet
              selectedYear={selectedYear}
              dataset={waterfallBalanceSheet}
              categories={[
                { name: "Total Assets", field: "total_assets" },
                { name: "Total Liabilities", field: "total_liabilities" },
                { name: "Total Equity", field: "total_equity" },
              ]}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  )
}

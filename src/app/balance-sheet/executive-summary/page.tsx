"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import WaterfallWorkingCapital from "@/components/WaterfallWorkingCapital"
import { dataYears } from "@/data/balance_sheet_data"
import { useState } from "react"

export default function ExecutiveSummary() {
  const [selectedYear, setSelectedYear] = useState(2024)

  return (
    <div>
      <div className="space-y-10">
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
        <div className="flex w-full">
          <div>
            <h3>Net Working Capital</h3>
            <WaterfallWorkingCapital selectedYear={selectedYear} />
          </div>
          <div>
            <h3>Total Equity</h3>
            <WaterfallWorkingCapital selectedYear={selectedYear} />
          </div>
        </div>
      </div>
    </div>
  )
}

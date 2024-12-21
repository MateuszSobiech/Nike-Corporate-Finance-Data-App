"use client"

import SankeyRegion from "@/components/SankeyRegion"
import SankeySegment from "@/components/SankeySegment"
import SankeySegmentRegion from "@/components/SankeySegmentRegion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { useState } from "react"

import EbitCard from "@/components/EbitCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import {
  Ebit,
  EbitMargin,
  EbitOpEx,
  EbitOpExRatio,
  EbitRevenues,
  dataYears,
} from "@/data/ebit_data"
import sankeyRegionData from "@/data/sankey_region_data"
import sankeySegmentData from "@/data/sankey_segment_data"
import sankeySegmentRegionData from "@/data/sankey_segment_region_data"

export default function ExecutiveSummary() {
  // State for selected fiscal year
  const [selectedYear, setSelectedYear] = useState(2024)

  // Filter data based on selected fiscal year
  const getFilteredData = (data: []) => {
    return data.filter((item) => item.fiscal_year === selectedYear)
  }

  return (
    <div className="pt-6">
      <div className="space-y-10">
        <section>
          <div className="grid grid-cols-1">
            <h2 className="mb-4 mt-2 scroll-mt-8 text-lg font-semibold text-gray-900 dark:text-gray-50">
              FY2024 Financial Performance Summary
            </h2>
            <Tabs defaultValue="tab1">
              <TabsList variant="solid">
                <TabsTrigger value="tab1">by Product Line</TabsTrigger>
                <TabsTrigger value="tab2">by Region</TabsTrigger>
                <TabsTrigger value="tab3">by Product Line & Region</TabsTrigger>
              </TabsList>
              <div className="ml-2 mt-4">
                <TabsContent
                  value="tab1"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <div>
                    <SankeySegment data={sankeySegmentData} />
                  </div>
                </TabsContent>
                <TabsContent
                  value="tab2"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <div>
                    <SankeyRegion data={sankeyRegionData} />
                  </div>
                </TabsContent>
                <TabsContent
                  value="tab3"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <div>
                    <SankeySegmentRegion data={sankeySegmentRegionData} />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>
        <section id="ebit">
          <div className="sticky top-0 z-20 mt-14 flex items-end justify-between border-b border-gray-200 bg-white pb-4 pt-4 dark:border-gray-800 dark:bg-gray-950">
            <h2 className="flex scroll-mt-8 items-end text-lg font-semibold text-gray-900 dark:text-gray-50">
              EBIT Performance Overview
            </h2>
            <div className="flex items-center">
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:R9jtt7qj6:-trigger-tab1"
                id="radix-:R9jtt7qj6:-content-tab1"
                className="mr-2 space-y-2 text-sm leading-7 text-gray-600 outline outline-0 outline-offset-2 outline-orange-500 focus-visible:outline-2 dark:text-gray-500 dark:outline-orange-500"
              ></div>

              <div className="w-40">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="mx-auto h-8">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataYears.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-10 grid w-full grid-cols-3 gap-20">
            <EbitCard
              title="EBIT"
              value={getFilteredData(Ebit)[0]?.value || 0}
              previous={getFilteredData(Ebit)[0]?.previous || 0}
              metricType="currency"
              data={Ebit}
              selectedYear={getFilteredData(Ebit)[0]?.fiscal_year}
            />
            <EbitCard
              title="EBIT Margin"
              value={getFilteredData(EbitMargin)[0]?.value || "0%"}
              previous={getFilteredData(EbitMargin)[0]?.previous || "0%"}
              metricType="percentage"
              data={EbitMargin}
              selectedYear={getFilteredData(EbitMargin)[0]?.fiscal_year}
            />
            <EbitCard
              title="Revenues"
              value={getFilteredData(EbitRevenues)[0]?.value || 0}
              previous={getFilteredData(EbitRevenues)[0]?.previous || 0}
              metricType="currency"
              data={EbitRevenues}
              selectedYear={getFilteredData(EbitRevenues)[0]?.fiscal_year}
            />
            <EbitCard
              title="Operating Expenses"
              value={getFilteredData(EbitOpEx)[0]?.value || 0}
              previous={getFilteredData(EbitOpEx)[0]?.previous || 0}
              metricType="currency"
              data={EbitOpEx}
              selectedYear={getFilteredData(EbitOpEx)[0]?.fiscal_year}
            />
            <EbitCard
              title="OpEx as % of Revenue"
              value={getFilteredData(EbitOpExRatio)[0]?.value || "0%"}
              previous={getFilteredData(EbitOpExRatio)[0]?.previous || "0%"}
              metricType="percentage"
              data={EbitOpExRatio}
              selectedYear={getFilteredData(EbitOpExRatio)[0]?.fiscal_year}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

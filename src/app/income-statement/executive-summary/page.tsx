"use client"
import SankeySegment from "@/components/SankeySegment"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import updatedData from "@/data/sankey_segment_data"

export default function ExecutiveSummary() {
  const dataYears = [
    {
      value: "2024",
      label: "FY2024",
    },
    {
      value: "2023",
      label: "FY2023",
    },
    {
      value: "2022",
      label: "FY2022",
    },
    {
      value: "2021",
      label: "FY2021",
    },
    {
      value: "2020",
      label: "FY2020",
    },
  ]
  return (
    <div className="pt-6">
      <div className="space-y-10">
        <section>
          <div className="grid grid-cols-1">
            <h2 className="mb-4 mt-2 scroll-mt-8 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
              FY2024 Income Statement Overview
            </h2>
            <Tabs defaultValue="tab1">
              <TabsList variant="solid">
                <TabsTrigger value="tab1">by Segment</TabsTrigger>
                <TabsTrigger value="tab2">by Region</TabsTrigger>
                <TabsTrigger value="tab3">by Segment & Region</TabsTrigger>
              </TabsList>
              <div className="ml-2 mt-4">
                <TabsContent
                  value="tab1"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <div>
                    <SankeySegment
                      data={updatedData}
                      width={975}
                      height={500}
                    />
                  </div>
                </TabsContent>
                <TabsContent
                  value="tab2"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <p>Sankey by Region</p>
                </TabsContent>
                <TabsContent
                  value="tab3"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <p>Sankey by Segment & Region</p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>
        <section>
          <h2 className="mb-4 mt-2 scroll-mt-8 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
            Key Financial Measures
          </h2>
          <div className="sticky top-16 z-20 flex items-center justify-between border-b border-gray-200 bg-white pb-4 pt-4 sm:pt-4 lg:top-0 lg:mx-0 lg:px-0 lg:pt-4 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center">
              <div
                data-state="inactive"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:R9jtt7qj6:-trigger-tab1"
                id="radix-:R9jtt7qj6:-content-tab1"
                className="mr-4 space-y-2 text-base leading-7 text-gray-600 outline outline-0 outline-offset-2 outline-orange-500 focus-visible:outline-2 dark:text-gray-500 dark:outline-orange-500"
              >
                <p>Select Fiscal Year</p>
              </div>

              <div className="w-40">
                <Select defaultValue="2024">
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
        </section>
      </div>
    </div>
  )
}

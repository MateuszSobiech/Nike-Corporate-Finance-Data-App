// page.jsx

"use client"
import SankeySegment from "@/components/SankeySegment"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import sankey_segment_data from "@/data/sankey_segment_data"

export default function ExecutiveSummary() {
  return (
    <div className="pt-6">
      <div className="space-y-10">
        <section>
          <div className="grid grid-cols-1">
            <h2 className="scroll-mt-10 pb-2 font-semibold text-gray-900 dark:text-gray-50">
              FY2024 Income Statement Overview
            </h2>
            <Tabs defaultValue="tab1">
              <TabsList variant="solid">
                <TabsTrigger value="tab1">Segment</TabsTrigger>
                <TabsTrigger value="tab2">Region</TabsTrigger>
                <TabsTrigger value="tab3">Segment & Region</TabsTrigger>
              </TabsList>
              <div className="ml-2 mt-4">
                <TabsContent
                  value="tab1"
                  className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                >
                  <div>
                    <SankeySegment
                      data={sankey_segment_data}
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
          <div className="grid grid-cols-1">
            <h2 className="scroll-mt-10 font-semibold text-gray-900 dark:text-gray-50">
              Key Financial Measures
            </h2>
          </div>
        </section>
      </div>
    </div>
  )
}

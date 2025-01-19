"use client"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"

export default function CashFlow() {
  return (
    <>
      <main className="lg:pl-1">
        <div className="relative">
          <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
            <div aria-labelledby="current-billing-cycle">
              <h1
                id="current-billing-cycle"
                className="mb-12 scroll-mt-10 text-2xl font-semibold text-gray-900 dark:text-gray-50"
              >
                Cash Flow
              </h1>
              <TabNavigation>
                <TabNavigationLink href="#" active>
                  Executive Summary
                </TabNavigationLink>
                <TabNavigationLink href="#">
                  Cash Flow & Balance
                </TabNavigationLink>
              </TabNavigation>
              <div className="flex h-screen w-full items-center justify-center pb-96">
                <h1 className="text-sm font-medium text-gray-600 dark:text-gray-500">
                  View under construction
                </h1>
              </div>
            </div>
            {/* {children} */}
          </div>
        </div>
      </main>
    </>
  )
}

"use client"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"

export default function IncomeStatement({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="lg:pl-1">
      <div className="relative">
        <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
          <div aria-labelledby="current-billing-cycle">
            <h1
              id="current-billing-cycle"
              className="mb-12 scroll-mt-10 text-3xl font-semibold text-gray-900 dark:text-gray-50"
            >
              Income Statement
            </h1>
            <TabNavigation>
              <TabNavigationLink href="#" active>
                Executive Summary
              </TabNavigationLink>
              <TabNavigationLink href="#">Profit & Loss</TabNavigationLink>
              <TabNavigationLink href="#">
                Revenue & Cost of Revenues
              </TabNavigationLink>
              <TabNavigationLink href="#">Oparating Expences</TabNavigationLink>
            </TabNavigation>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

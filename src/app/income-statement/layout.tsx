"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { usePathname } from "next/navigation"

export default function IncomeStatement({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <main className="lg:pl-1">
      <div className="relative">
        <div className="p-4 lg:px-10 lg:pt-7">
          <div aria-labelledby="current-billing-cycle">
            <h1
              id="current-billing-cycle"
              className="mb-12 scroll-mt-10 text-2xl font-semibold text-gray-900 dark:text-gray-50"
            >
              Income Statement
            </h1>
            <TabNavigation>
              <TabNavigationLink
                href="/income-statement/executive-summary"
                active={pathname === "/income-statement/executive-summary"}
              >
                Executive Summary
              </TabNavigationLink>
              <TabNavigationLink
                href="/income-statement/profit-and-loss"
                active={pathname === "/income-statement/profit-and-loss"}
              >
                Profit & Loss
              </TabNavigationLink>
              <TabNavigationLink
                href="/income-statement/revenue-and-cor"
                active={pathname === "/income-statement/revenue-and-cor"}
              >
                Revenue & Cost of Revenues
              </TabNavigationLink>
              <TabNavigationLink
                href="/income-statement/operating-expenses"
                active={pathname === "/income-statement/operating-expenses"}
              >
                Oparating Expences
              </TabNavigationLink>
            </TabNavigation>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

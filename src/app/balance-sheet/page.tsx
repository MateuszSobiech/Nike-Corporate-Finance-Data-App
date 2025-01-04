"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { usePathname } from "next/navigation"

export default function BalanceSheet({
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
              Balance Sheet
            </h1>
            <TabNavigation>
              <TabNavigationLink
                href="/balance-sheet/executive-summary"
                active={pathname === "/balance-sheet/executive-summary"}
              >
                Executive Summary
              </TabNavigationLink>
              <TabNavigationLink
                href="/balance-sheet/current-assets-and-liabilities"
                active={
                  pathname === "/balance-sheet/current-assets-and-liabilities"
                }
              >
                Current Assets & Liabilities
              </TabNavigationLink>
              <TabNavigationLink
                href="/balance-sheet/non-current-assets-and-liabilities"
                active={
                  pathname ===
                  "/balance-sheet/non-current-assets-and-liabilities"
                }
              >
                Non-Current Assets & Liabilities
              </TabNavigationLink>
              <TabNavigationLink
                href="/balance-sheet/equity"
                active={pathname === "/balance-sheet/equity"}
              >
                Equity
              </TabNavigationLink>
            </TabNavigation>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

"use client"

type EbitCardProps = {
  title: string
  value: number | string
  previous: number | string
}

export default function EbitCard({ title, value, previous }: EbitCardProps) {
  return (
    <div className="w-full rounded-lg bg-white shadow-md dark:bg-gray-800">
      <div className="p-4 px-10 pt-7">
        <div className="flex">
          <h1 className="mr-2 text-sm font-bold text-gray-900 dark:text-gray-50">
            {title}
          </h1>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-xl font-medium text-gray-900 dark:text-gray-50">
            {value}
          </p>
          <p className="text-sm text-gray-500">from {previous}</p>
        </div>
      </div>
      <div className="p-4 text-xs text-gray-500 dark:text-gray-400">
        Placeholder for area chart
      </div>
    </div>
  )
}

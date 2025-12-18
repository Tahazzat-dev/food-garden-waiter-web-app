import React from 'react'

export default function SearchProductLoader() {
  return (
    <div className="w-full mx-auto space-y-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex gap-2 p-2 shadow rounded-lg bg-white dark:bg-slate-700 animate-pulse"
        >
          {/* Left Image Skeleton */}
          <div className="w-12 h-12 rounded-md bg-gray-200 shrink-0" />

          {/* Right Content Skeleton */}
          <div className="flex flex-col flex-1">
            {/* Title */}
            <div className="h-4 w-3/4 bg-gray-200 rounded" />

            {/* Price */}
            <div className="h-3 w-1/3 mt-3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

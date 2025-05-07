import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Investors Card Skeleton */}
      <div className="overflow-hidden rounded-lg border">
        <div className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-8 w-32" />
            <div className="mt-1">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Abandons Card Skeleton */}
      <div className="overflow-hidden rounded-lg border">
        <div className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-8 w-32" />
            <div className="mt-1">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Committed Amount Cards Skeleton */}
      <div className="flex flex-col overflow-hidden rounded-lg bg-gray-200">
        <div className="p-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-6 w-32" />
          <Skeleton className="mt-1 h-4 w-40" />
        </div>
        <div className="h-24 w-full bg-gray-300" />
        <div className="flex items-center justify-between bg-gray-300 px-4 py-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Abandons Committed Amount Skeleton */}
      <div className="flex flex-col overflow-hidden rounded-lg bg-gray-200">
        <div className="p-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-6 w-32" />
          <Skeleton className="mt-1 h-4 w-40" />
        </div>
        <div className="h-24 w-full bg-gray-300" />
        <div className="flex items-center justify-between bg-gray-300 px-4 py-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}


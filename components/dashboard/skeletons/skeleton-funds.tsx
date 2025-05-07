import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export const SkeletonFunds = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Received & cleared for next disbursement */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-2">
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="mt-1 h-8 w-16" />
            </div>
            <div className="flex flex-col rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="mt-1 h-8 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Received & not cleared for next disbursement */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-2">
            <Skeleton className="h-5 w-72" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="mt-1 h-8 w-16" />
            </div>
            <div className="flex flex-col rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="mt-1 h-8 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last disbursement */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-2">
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="mt-1 h-6 w-16" />
            </div>
            <div className="flex flex-col rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="mt-1 h-6 w-16" />
            </div>
            <div className="flex flex-col rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="mt-1 h-6 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


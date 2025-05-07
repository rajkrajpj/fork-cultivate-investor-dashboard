import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const SkeletonChart = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-6 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Skeleton className="h-10 w-40 rounded-md" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}


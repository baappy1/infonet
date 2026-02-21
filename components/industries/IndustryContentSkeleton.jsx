"use client";

import Skeleton from "@/components/ui/Skeleton";

export default function IndustryContentSkeleton() {
  return (
    <div className="container mx-auto py-12 lg:py-20 px-5 space-y-16">
      {/* Section 1 */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full max-w-[400px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      {/* Section 2 - cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>
      {/* Section 3 */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full max-w-[350px]" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[120px] w-[200px] shrink-0 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

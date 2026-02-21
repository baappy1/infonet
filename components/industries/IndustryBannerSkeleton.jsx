"use client";

import Skeleton from "@/components/ui/Skeleton";

export default function IndustryBannerSkeleton() {
  return (
    <div className="banner pt-[10px] pl-[10px] pr-[10px] h-screen lg:min-h-[720px]">
      <div className="h-full rounded-[8px] relative overflow-hidden bg-[#E4E4E7]">
        <div className="container h-full mx-auto pb-[10px] lg:pb-[120px] pl-[10px] pr-[10px] 2xl:pl-0 2xl:pr-0 relative z-10">
          <div className="flex flex-wrap items-end h-full">
            <div className="w-full flex flex-col">
              <div className="p-[20px] lg:p-[30px] rounded-[8px] bg-[#08090D]/5 backdrop-blur-[30px] w-full xl:w-[620px] space-y-5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full max-w-[400px]" />
                <Skeleton className="h-4 w-full max-w-[500px]" />
                <Skeleton className="h-4 w-3/4 max-w-[400px]" />
                <Skeleton className="h-12 w-36 rounded-[4px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

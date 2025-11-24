import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TokenCardSkeleton() {
  return (
    <div
      className="
        relative w-full
        border-b border-primaryStroke/50
        h-[142px] min-h-[142px] sm:h-[116px] sm:min-h-[116px] md:h-[116px] md:min-h-[116px] 
        lg:h-[142px] lg:min-h-[142px] xl:h-[142px] xl:min-h-[142px]
        overflow-hidden bg-card
      "
    >
      {/* MAIN CONTENT */}
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full gap-[12px] px-[12px] pt-[12px]">
          {/* AVATAR BLOCK */}
          <div className="flex flex-col items-center gap-[4px]">
            <Skeleton className="w-[68px] h-[68px] rounded-[4px] bg-primaryStroke/40" />
            <Skeleton className="h-[10px] w-[50px] bg-primaryStroke/40" />
          </div>

          {/* NAME + META */}
          <div className="flex flex-col flex-1 min-w-0 pt-[0px] gap-[6px]">
            {/* Name row */}
            <Skeleton className="h-[16px] w-[100px] bg-primaryStroke/40" />
            
            {/* Meta rows */}
            <div className="flex gap-[8px]">
              <Skeleton className="h-[12px] w-[35px] bg-primaryStroke/40" />
              <Skeleton className="h-[12px] w-[35px] bg-primaryStroke/40" />
            </div>
            <div className="flex gap-[8px]">
              <Skeleton className="h-[12px] w-[45px] bg-primaryStroke/40" />
              <Skeleton className="h-[12px] w-[25px] bg-primaryStroke/40" />
            </div>
          </div>
        </div>

        {/* Stats pills - at the very bottom of the card */}
        <div className="flex h-[24px] gap-[4px] items-end px-[12px] pb-[6px] mt-auto">
          <Skeleton className="h-[20px] w-[45px] rounded-full bg-primaryStroke/40" />
          <Skeleton className="h-[20px] w-[45px] rounded-full bg-primaryStroke/40" />
          <Skeleton className="h-[20px] w-[45px] rounded-full bg-primaryStroke/40" />
        </div>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProgressCardSkeletonLoading = () => {
  return (
    <Card className="flex flex-col gap-4 border border-[#EFEFEF] p-4 lg:w-[249px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-[50px] w-[50px] rounded-full" />
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-14 rounded-[12px]" />
        </div>
      </div>
    </Card>
  );
};

export default ProgressCardSkeletonLoading;

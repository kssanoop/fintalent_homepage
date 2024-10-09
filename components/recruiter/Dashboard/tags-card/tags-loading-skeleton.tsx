import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TagsLoadingSkeleton = () => {
  return (
    <Card className="flex flex-col gap-4 p-5 lg:w-full">
      <Skeleton className="h-4 w-20" />
      <div className="flex flex-col gap-2">
        {[...Array(2)]?.map(() => (
          <Card
            className="flex flex-col gap-3 rounded-[10px] p-4"
            key={crypto.randomUUID()}
          >
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-10" />
              <div className="flex items-center gap-1 text-sm font-normal leading-[21px] text-[#171717]">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </Card>
        ))}
        <div className="flex items-center justify-center">
          <Skeleton className="mt-4 h-3 w-8" />
        </div>
      </div>
    </Card>
  );
};

export default TagsLoadingSkeleton;

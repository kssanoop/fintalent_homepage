import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ProgressCardSkeletonLoading from "./progress-card-skeleton-loading";

const TabsLoading = () => {
  return (
    <div className="flex gap-3">
      <Card className={`w-[273px] rounded-[8px]`} key={crypto.randomUUID()}>
        <div className={`flex h-12 justify-between rounded-t-[8px]  p-3`}>
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-6 rounded-[4px]" />
        </div>
        {[...Array(2)].map((item) => (
          <div className="flex flex-col gap-3 p-3" key={crypto?.randomUUID()}>
            <ProgressCardSkeletonLoading />
          </div>
        ))}
      </Card>
    </div>
  );
};

export default TabsLoading;

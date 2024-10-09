import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonLoader = () => {
  return (
    <Card className="bg-white">
      <div className="flex justify-between px-5 py-5 transition-all">
        <div className="flex gap-4" style={{ flexBasis: "0 0 90%" }}>
          <div>
            <Skeleton className="h-12 w-12 rounded-sm" />
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-[100px]" />
              </div>
              {/* icons  */}
              <div className="flex gap-[19px]">
                {[...Array(3)]?.map((item) => (
                  <div
                    className="flex items-center gap-1"
                    key={crypto.randomUUID()}
                  >
                    <Skeleton className="h-2 w-6" />
                    <Skeleton className="h-2 w-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-16">
          <div className="flex w-[166px] flex-col items-start gap-1">
            <Skeleton className="h-2 w-8" />
            <Skeleton className="h-2 w-8" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SkeletonLoader;

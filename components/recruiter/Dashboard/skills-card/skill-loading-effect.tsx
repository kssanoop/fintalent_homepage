import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkillLoadingEffect = () => {
  return (
    <Card className="flex flex-col gap-6 p-5 lg:h-[347px] lg:w-full">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
      {/* pie chart */}
      <div className="flex items-center gap-6">
        <Skeleton className="h-[197px] w-[197px] rounded-full" />
        <div className="flex flex-col gap-4">
          {[...Array(5)].map(() => (
            <div className="flex gap-1" key={crypto.randomUUID()}>
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SkillLoadingEffect;

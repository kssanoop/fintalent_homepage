import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="flex h-[158px] gap-[18px] p-5">
      <Skeleton className="h-[118px] w-[118px] rounded-lg" />

      <div className="grow">
        <div className="mb-[26px]">
          <div className="space-y-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-[14px] w-1/4" />
            <Skeleton className="h-[14px] w-1/3" />
          </div>
        </div>
        <div>
          <div className="mb-5 flex gap-[30px]">
            <div className="space-y-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-[14px] w-1/4" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-[14px] w-1/4" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-[14px] w-1/4" />
            </div>
          </div>
          {/* <div>
            <h6 className="mb-1.5 text-xs font-medium text-[#5E5E5E]">
              <Skeleton className="h-5 w-24" />
            </h6>
            <div className="flex w-full flex-wrap gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div> */}
        </div>
      </div>
    </Card>
  );
};

export default CardSkeleton;

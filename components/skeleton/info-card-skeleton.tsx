import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const InfoCardSkeleton = () => {
  return (
    <Card className="flex h-[325px] flex-col gap-[18px] p-5 md:flex-row">
      <div className="flex gap-6 md:flex-col ">
        <Skeleton className="mb-1.5 h-[72px] w-[72px] rounded-lg md:h-[118px] md:w-[118px]" />
        <div className="flex grow  space-x-1 md:flex-col md:space-x-0 md:space-y-1">
          <Skeleton className="h-[45px] w-full" />
          <Skeleton className="h-[45px] w-full" />
        </div>
      </div>
      <div className="grow">
        <div className="mb-[26px]">
          <div className="space-y-1">
            <Skeleton className="h-5 md:w-24" />
            <Skeleton className="h-[14px] md:w-1/4" />
            <Skeleton className="h-[14px] md:w-1/3" />
          </div>
        </div>
        <div>
          <div className="mb-5 hidden gap-[30px] md:flex">
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
          <div>
            <h6 className="mb-1.5 text-xs font-medium text-[#5E5E5E]">
              <Skeleton className="h-5 w-24" />
            </h6>
            <div className="hidden w-full flex-wrap gap-2 md:flex">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InfoCardSkeleton;

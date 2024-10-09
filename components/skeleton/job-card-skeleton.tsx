import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface JobCardSkeletonProps {
  page?: string;
}

const JobCardSkeleton = ({ page }: JobCardSkeletonProps) => {
  return (
    <Card className="mb-3 flex flex-col gap-3 p-6 md:mb-1">
      <div className="flex gap-2 md:gap-4">
        <Skeleton className="h-12 w-12 rounded-[5.88px]" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className=" h-6 w-1/2 " />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
      <div className="flex items-end justify-end pt-4">
        {page === "jobOffer" && (
          <div className="flex gap-2">
            <Skeleton className="  h-9 w-16 " />
            <Skeleton className=" h-9 w-16  " />
          </div>
        )}
      </div>
    </Card>
  );
};

export default JobCardSkeleton;

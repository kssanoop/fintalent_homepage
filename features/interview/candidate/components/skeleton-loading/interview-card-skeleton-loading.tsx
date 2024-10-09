import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  section: string;
}

const InterviewCardSkeletonLoading = ({ section }: Props) => {
  return (
    <Card className="max-w-full px-5 py-4 md:p-5">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton className="h-12 w-12 rounded-lg" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 md:w-[250px]" />

            <div
              className={`flex items-center  
                gap-2
              `}
            >
              <Skeleton className="h-4 w-[70px] md:w-[150px]" />
            </div>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 whitespace-nowrap ${
            section === "dashboard" ? "hidden md:hidden" : "md:hidden"
          }`}
        >
          <Skeleton className="h-4 w-[50px] md:w-[100px]" />
          <Skeleton className="h-4 w-[70px] md:w-[150px]" />
        </div>
      </div>
      {/* time/date */}
      <div
        className={`flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-0 ${
          section === "dashboard" ? "pt-5" : "pt-6 md:pt-7"
        }`}
      >
        <div className="flex flex-col gap-[11px]">
          {section === "Request" ? (
            <div className="flex items-center gap-1">
              <div>
                <Skeleton className="h-[24px] w-[24px] rounded-sm" />
              </div>
              <div className="text-base font-normal text-[#5E5E5E]">
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </div>
          ) : null}
          <div className="flex items-center gap-1">
            <div>
              <Skeleton className="h-[24px] w-[24px] rounded-sm" />
            </div>
            <div className="text-base font-normal text-[#5E5E5E]">
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>
        </div>
        {/* buttons */}
        <div className="flex md:items-end">
          {section === "Request" ? (
            <div className="flex gap-2">
              <Skeleton className="h-6 w-[100px]" />
              {/* Skeleton for Decline button */}
              <Skeleton className="h-6 w-[82px]" />
              {/* Skeleton for Accept button */}
              <Skeleton className="h-6 w-[82px]" />
            </div>
          ) : (
            section !== "dashboard" && <Skeleton className="h-8 w-[60px]" />
          )}
        </div>
      </div>
    </Card>
  );
};

export default InterviewCardSkeletonLoading;

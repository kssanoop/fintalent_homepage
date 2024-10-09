import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInterviewUpcomingCandidate } from "@/features/interview/api/get-interview-upcoming-candidate";
import InterviewCard from "@/features/interview/candidate/components/InterviewCard";
import InterviewCardSkeletonLoading from "@/features/interview/candidate/components/skeleton-loading/interview-card-skeleton-loading";
import { InterviewData } from "@/features/interview/schema/interview-data-schema";
import Link from "next/link";
import React from "react";

const InterviewDesign = () => {
  const { data, isLoading } = useGetInterviewUpcomingCandidate();
  const filteredData = data;

  if (isLoading) {
    return (
      <Card className="flex flex-col gap-2 p-5 lg:min-w-[48.5%] lg:max-w-[50%]">
        {/* heading */}
        <div className="flex gap-1 text-base font-bold">
          <Skeleton className="h-3 w-4 rounded-sm" />
          <Skeleton className="h-3 w-24 rounded-sm" />
        </div>
        {/* interview Card */}
        {[...Array(2)].map(() => {
          return (
            <InterviewCardSkeletonLoading
              section="dashboard"
              key={crypto.randomUUID()}
            />
          );
        })}
        <div className="flex items-center justify-center">
          <Skeleton className="h-3 w-6 rounded-sm" />
        </div>
      </Card>
    );
  }

  const noOfInterviews = data?.length;
  const renderS = noOfInterviews !== 1 ? "s" : "";

  return (
    <Card className="flex flex-col gap-2 p-5 lg:min-w-[48.5%] lg:max-w-[50%]">
      {/* heading */}
      <div className="flex gap-1 text-base font-bold">
        <span className="text-[#034A9A]">{noOfInterviews}</span>
        <h1 className="text-[#000000]">
          Interview{renderS} schedule{renderS}
          {renderS}
        </h1>
      </div>
      {/* interview Card */}
      {filteredData
        ?.slice(0, 2)
        ?.sort((a: any, b: any) => a.valueOf() - b.valueOf())
        .map((interviewsData: any) => (
          <div key={crypto.randomUUID()}>
            {interviewsData?.interviews
              ?.sort(
                (a: any, b: any) =>
                  new Date(a._id).valueOf() - new Date(b._id).valueOf(),
              )
              ?.slice(0, 1)
              ?.map((interview: InterviewData) => (
                <div className="" key={interview?._id}>
                  <InterviewCard section="dashboard" data={interview} />
                </div>
              ))}
          </div>
        ))}

      {filteredData?.length !== 0 && (
        <Link
          href={"candidate/interviews"}
          className="self-center text-base font-semibold text-[#034A9A]"
        >
          View all
        </Link>
      )}
    </Card>
  );
};

export default InterviewDesign;

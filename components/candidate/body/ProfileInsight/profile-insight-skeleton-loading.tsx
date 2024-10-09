import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface ProfileInsightSkeletonLoadingProps {
  section: string;
}

const ProfileInsightSkeletonLoading = ({
  section,
}: ProfileInsightSkeletonLoadingProps) => {
  return (
    <Card className="w-full flex-grow gap-3 rounded-lg border border-solid border-[#E9E9E9] bg-white p-3 lg:p-5">
      <div
        className={`flex ${
          section === "recruiter" ? "flex-row" : "flex-col"
        } items-start gap-3 lg:flex-row lg:items-center`}
      >
        <Skeleton className="h-10 w-10 rounded-sm  md:h-12 md:w-12" />
        <div
          className={`flex ${
            section === "profile" ||
            section === "platform" ||
            section === "recruiter"
              ? "flex-col"
              : "flex-col lg:flex-row"
          } gap-1 ${section === "lpa" && "items-start lg:items-center"}`}
        >
          <Skeleton className="mb-1 h-4 w-4 rounded-sm md:w-6" />
          <Skeleton className="h-3 w-10 rounded-sm md:w-24" />
        </div>
      </div>
      {section === "platform" && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-10 rounded-sm" />
          <Skeleton className="h-4  w-24 rounded-sm" />
        </div>
      )}
      {section === "lpa" && (
        <div className="flex flex-col gap-2 md:flex-row">
          <Skeleton className="h-4 w-8 rounded-sm md:w-10" />
          <Skeleton className="h-4 w-12 rounded-sm md:w-24" />
        </div>
      )}
    </Card>
  );
};

export default ProfileInsightSkeletonLoading;

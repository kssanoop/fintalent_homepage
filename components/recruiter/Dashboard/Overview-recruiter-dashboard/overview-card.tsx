import DropdownMenuComponent from "@/components/candidate/body/ProfileInsight/DropdownMenuComponent";
import ProfileInsightCard from "@/components/candidate/body/ProfileInsight/ProfileInsightCard";
import ProfileInsightSkeletonLoading from "@/components/candidate/body/ProfileInsight/profile-insight-skeleton-loading";
// import { Skeleton } from "@/components/ui/skeleton";
import { useGetOverviewRecruiterDashboard } from "@/features/profile-setup/api/get-dashboard-overview";
import JobInviteIcon from "@/public/svg/JobInviteIcon";
import JobOfferedIcon from "@/public/svg/JobOfferedIcon";
import ProfileViewIcon from "@/public/svg/ProfileViewIcon";
import Link from "next/link";
import React, { useState } from "react";

const OverviewCard = () => {
  const currentDate = new Date();
  const [fromDateOverview, setFromDateOverview] = useState(
    new Date(currentDate.setDate(currentDate.getDate() - 365)),
  );
  const [toDateOverview, setToDateOverview] = useState(new Date());

  const { data, isLoading: isOverviewLoading } =
    useGetOverviewRecruiterDashboard(fromDateOverview, toDateOverview);
  const Data = [
    {
      id: 1,
      color: "#EEEBFF",
      value: `${data?.candidateOnboarded ?? "0"}`,
      name: "Candidates onboarded",
      icon: <ProfileViewIcon />,
      href: "/recruiter/candidates",
    },
    {
      id: 2,
      color: "#E5F3FF",
      value: `${data?.jobPosted ?? "0"}`,
      name: "Job Posted",
      icon: <JobInviteIcon />,
      href: "/recruiter/jobs",
    },
    {
      id: 3,
      color: "#EAF8F1",
      value: `${data?.views ?? "0"}`,
      name: "Profiles viewed",
      icon: <JobOfferedIcon />,
      href: "/recruiter/candidates",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full justify-between">
        <h2 className="text-base font-normal text-[#171717]">Overview</h2>
        <div>
          <DropdownMenuComponent
            setFromDate={setFromDateOverview}
            setToDate={setToDateOverview}
            fromDate={fromDateOverview}
            toDate={toDateOverview}
          />
        </div>
      </div>
      {/* cards */}
      {isOverviewLoading ? (
        <div className="flex flex-col gap-1 lg:flex-row lg:gap-3">
          {[...Array(3)].map(() => (
            <ProfileInsightSkeletonLoading
              section={"recruiter"}
              key={crypto.randomUUID()}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1 lg:flex-row lg:gap-3">
          {Data?.map((item) => {
            // const DynamicTag = item.href ? Link : "div";
            return (
              <Link
                href={item.href}
                className="flex w-full flex-wrap gap-3 rounded-lg transition-all hover:shadow"
                key={item.id}
              >
                <ProfileInsightCard info={item} section={"recruiter"} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OverviewCard;

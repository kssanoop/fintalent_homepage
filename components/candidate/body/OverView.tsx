import JobInviteIcon from "@/public/svg/JobInviteIcon";
import JobOfferedIcon from "@/public/svg/JobOfferedIcon";
import ProfileViewIcon from "@/public/svg/ProfileViewIcon";
import React, { useState } from "react";
import ProfileInsightCard from "./ProfileInsight/ProfileInsightCard";
import AppearanceCard from "./Appearance/AppearanceCard";
import InterviewDesign from "./Interview-schedule/InterviewDesign";
import { CompaniesInterest } from "./Companies-Interested/CompaniesInterest";
import DropdownMenuComponent from "./ProfileInsight/DropdownMenuComponent";
import { useGetOverview } from "@/features/profile/candidate/api/getOverview";
import { useGetPlatformOverview } from "@/features/profile/candidate/api/get-platform-overview";
import ProfileInsightSkeletonLoading from "./ProfileInsight/profile-insight-skeleton-loading";
const OverView = () => {
  const currentDate = new Date();
  const [fromDateOverview, setFromDateOverview] = useState(
    new Date(currentDate.setDate(currentDate.getDate() - 365)),
  );
  const [toDateOverview, setToDateOverview] = useState(new Date());
  const [fromDatePlatformOverview, setFromDatePlatformOverview] = useState(
    new Date(currentDate.setDate(currentDate.getDate() - 365)),
  );
  const [toDatePlatformOverview, setToDatePlatformOverview] = useState(
    new Date(),
  );
  const { data, isLoading: isOverviewLoading } = useGetOverview(
    fromDateOverview,
    toDateOverview,
  );
  const { data: platformOverviewData, isLoading: isPlaformOverviewLoading } =
    useGetPlatformOverview(fromDatePlatformOverview, toDatePlatformOverview);

  const Data = [
    {
      id: 1,
      color: "#EEEBFF",
      value: `${data?.views ?? "0"}`,
      name: "Profile views",
      icon: <ProfileViewIcon />,
    },
    {
      id: 2,
      color: "#E5F3FF",
      value: `${data?.jobInvites ?? "0"}`,
      name: "Job invites",
      icon: <JobInviteIcon />,
      redirect: "/jobs",
    },
    {
      id: 3,
      color: "#EAF8F1",
      value: `${data?.jobOffers ?? "0"}`,
      name: "Jobs offered",
      icon: <JobOfferedIcon />,
      redirect: "/jobs?type=offered",
    },
  ];

  const PlatformData = [
    {
      id: 1,
      value: `${platformOverviewData?.activeJobs ?? "0"}`,
      name: "Total active jobs",
    },
    {
      id: 2,
      value: `${platformOverviewData?.hiring ?? "0"}`,
      name: "Total hirings in platform",
    },
    {
      id: 1,
      value: `${platformOverviewData?.interviews ?? "0"}`,
      name: "Total interviews in platform",
    },
  ];

  const PlatformLPA = [
    {
      id: 1,
      value: `${platformOverviewData?.highestCTC.toFixed(2) ?? "0"} LPA`,
      name: "Highest CTC",
    },
    {
      id: 2,
      value: `${platformOverviewData?.averageCTC.toFixed(2) ?? "0"} LPA`,
      name: "Average CTC",
    },
  ];
  return (
    <div className="flex w-full flex-col gap-5 md:gap-6 lg:pl-6">
      {/* candidate data  */}
      <div className="mt-6 flex flex-col gap-1 lg:mt-0">
        <div className="flex justify-between">
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
        <div className="flex gap-1 lg:gap-3">
          {/* data card */}
          {Data.map((info, index) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="flex w-full flex-wrap gap-3"
              >
                {isOverviewLoading ? (
                  <ProfileInsightSkeletonLoading section={"profile"} />
                ) : (
                  <ProfileInsightCard info={info} section={"profile"} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h2 className="text-base font-normal text-[#171717]">
            Happening around our platform
          </h2>
          <div>
            <DropdownMenuComponent
              setFromDate={setFromDatePlatformOverview}
              setToDate={setToDatePlatformOverview}
              fromDate={fromDatePlatformOverview}
              toDate={toDatePlatformOverview}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 lg:flex-row lg:gap-3">
          {/* data card */}
          {PlatformData.map((info, index) => {
            return (
              <div key={crypto.randomUUID()} className="flex w-full gap-3">
                {isPlaformOverviewLoading ? (
                  <ProfileInsightSkeletonLoading section={"platform"} />
                ) : (
                  <ProfileInsightCard info={info} section={"platform"} />
                )}
              </div>
            );
          })}
        </div>
        {/* job LPA */}
        <div className="mt-1 flex gap-3">
          {PlatformLPA.map((info, index) => {
            return (
              <div key={crypto.randomUUID()} className="flex w-full gap-3">
                {isPlaformOverviewLoading ? (
                  <ProfileInsightSkeletonLoading section={"lpa"} />
                ) : (
                  <ProfileInsightCard info={info} section={"lpa"} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyword Apperance */}
      <div className="flex flex-col gap-[19px] lg:flex-row">
        <AppearanceCard />
        <InterviewDesign />
      </div>
      {/* companies interested */}
      <CompaniesInterest />
    </div>
  );
};
export default OverView;

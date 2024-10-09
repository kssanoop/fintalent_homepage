import React from "react";
import CandidatesDataBar from "./candidates-data-bar";
import DashboardRolesCard from "./dashboard-roles-card";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import BarData from "./bar-data";
import SignupHiredChart from "./signup-hired-chart";
import HighestAverageChart from "./highest-average-chart";
// import BarChart from "./bat-chart";
import CompanyJobFilter from "./company-job-filter";
import RevenueChart from "./revenue-graph";
// import DynamicWidthContainer from "../layout/dynamic-width-container";
import { useGetInfoFromCookieAdminDashboard } from "@/features/admin/dashboard/api/get-roles";
import { useGetLoginCount } from "@/features/admin/dashboard/api/login-count";
import { useGetCTCCount } from "@/features/admin/dashboard/api/get-ctc-data";
import { useGetSignupHired } from "@/features/admin/dashboard/api/get-signup-login-data";
import { useGetRevenueChart } from "@/features/admin/dashboard/api/get-revenue-chart";
import SkillsAndQualifications from "./skills-and-qualifications/skills-and-qualifications";

const DashboardBody = () => {
  const { data: RolesData } = useGetInfoFromCookieAdminDashboard();
  const { data: LoginCount, isLoading } = useGetLoginCount();
  const { data: CTCData } = useGetCTCCount();
  const { data: signuphiredData } = useGetSignupHired();
  const { data: revenues, isLoading: isRevenueLoading } = useGetRevenueChart();

  //  console.log("Data", signuphiredData);
  return (
    <DynamicHeightContainer>
      <div className="relative flex h-full w-full flex-col gap-[13px]">
        <div className="flex h-full w-full flex-col gap-2 px-5 lg:flex-row">
          <div>
            <CandidatesDataBar
              RolesData={RolesData}
              LoginCount={LoginCount}
              isLoading={isLoading}
            />
          </div>
          <div className="w-full">
            <DashboardRolesCard RolesData={RolesData} LoginCount={LoginCount} />
          </div>
          <div className="ml-0.5">
            <BarData />
          </div>
        </div>

        <div className="flex gap-x-1.5 px-5">
          <SkillsAndQualifications />
        </div>

        <div>
          <div className="flex flex-col gap-1.5 px-5 lg:flex-row">
            <SignupHiredChart signuphiredData={signuphiredData} />
            <HighestAverageChart CTCData={CTCData} />
          </div>
          <div className="w-full px-5 pt-[5px]">
            {isRevenueLoading || !revenues ? (
              ""
            ) : (
              <RevenueChart
                revenueChartData={revenues.map(
                  (revenue) => revenue.totalAmount,
                )}
              />
            )}
          </div>
        </div>
        <div className="px-5">
          <CompanyJobFilter />
        </div>
      </div>
    </DynamicHeightContainer>
  );
};

export default DashboardBody;

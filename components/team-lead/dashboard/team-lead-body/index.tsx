import React from "react";
import TeamLeadCandidateDataBar from "../team-lead-candidate-data";
import TeamLeadsList from "./team-leads-list";
import BarData from "./bar-data";
import ReOpenRequestCardDashboard from "./reopen-request";
import CompanyJobFilterTL from "../company-job-filter/company-job-filter-TL";
import Link from "next/link";
import { DayFilter } from "@/components/manager/dashboard/manager-dashboard-body";

const TeamLeadDashboardBody = ({
  selectedFilter,
}: {
  selectedFilter: DayFilter;
}) => {
  return (
    <>
      <div className="relative flex max-h-[520px] basis-full flex-col gap-5 overflow-auto pr-5 text-brand-black lg:flex-row">
        <Link href="/teamlead/candidates">
          <TeamLeadCandidateDataBar />
        </Link>
        <div className="flex grow flex-col gap-3 overflow-auto">
          <div className="flex grow gap-5 overflow-y-auto">
            <TeamLeadsList selectedFilter={selectedFilter} />
            <div className="flex flex-col gap-2">
              <BarData />
              <ReOpenRequestCardDashboard />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <CompanyJobFilterTL />
      </div>
    </>
  );
};

export default TeamLeadDashboardBody;

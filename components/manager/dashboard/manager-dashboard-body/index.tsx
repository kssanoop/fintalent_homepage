import React from "react";
import GeneralStatics from "./general-statics";
import TeamLeadsList from "./team-leads-list";
import ManagerCandidateDataBar from "../manager-candidates-data-bar";
import BarData from "./bar-data";
import KanbanContainer from "./kanban/kanban-container";
import { Filter } from "@/features/dashboard/api/get-revenue-number";
// import CompanyJobFilter from "@/components/Dashboard/company-job-filter";
export type DayFilter = {
  id: number;
  name: string;
  label: Filter;
};
const ManagerDashboardBody = ({
  selectedFilter,
}: {
  selectedFilter: DayFilter;
}) => {
  return (
    <>
      <div className="relative flex max-h-[520px] basis-full flex-col gap-5 overflow-auto text-brand-black lg:flex-row">
        <div>
          <ManagerCandidateDataBar />
        </div>
        <div className="flex grow flex-col gap-3 overflow-auto">
          {/* cards container */}
          <div>
            <GeneralStatics selectedFilter={selectedFilter} />
          </div>

          <div className="flex grow gap-5 overflow-y-auto">
            <TeamLeadsList selectedFilter={selectedFilter} />
            <BarData />
          </div>
        </div>
      </div>
      {/* <div className=""> */}
      <KanbanContainer />
      {/* </div> */}
    </>
  );
};

export default ManagerDashboardBody;

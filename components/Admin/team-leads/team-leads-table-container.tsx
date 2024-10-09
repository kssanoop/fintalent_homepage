import { Loader2 } from "lucide-react";
import TeamLeadsTable from "./team-leads-table";
import { UseQueryResult } from "@tanstack/react-query";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";

const TeamLeadsTableContainer = ({
  dataResponse,
}: {
  dataResponse: UseQueryResult<TeamLeadInfo[], unknown>;
}) => {
  const { data: teamLeads, isLoading, isError, error } = dataResponse;

  if (isError) {
    console.log(error);
    return <h1>Something went wrong</h1>;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          {" "}
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        </div>
      ) : teamLeads.length === 0 ? (
        <h1 className="text-center text-xl text-brand-blue">
          No team leads to show
        </h1>
      ) : (
        <DynamicHeightContainer>
          <TeamLeadsTable teamLeads={teamLeads} />
        </DynamicHeightContainer>
      )}
    </>
  );
};

export default TeamLeadsTableContainer;

import useGetTeamLeadsForAdmin from "../api/get-team-leads-for-admin";

export const useGetTeamLeadByIdForAdmin = (teamLeadId: string) => {
  const { data: teamLeads, isLoading } = useGetTeamLeadsForAdmin();
  const teamLead = teamLeads?.find(
    (teamLead) => teamLead.teamLeadId === teamLeadId,
  );

  return { teamLead, isLoading };
};

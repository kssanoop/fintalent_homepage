export type InactivateTeamLeadSchema = {
  candidates: Array<{
    teamLeadId: string;
    assignedCandidates: string[] | [];
  }>;
};

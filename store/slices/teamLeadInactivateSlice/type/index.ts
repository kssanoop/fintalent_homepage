import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";

export type TeamLeadInactivateState = {
  inactivatingTeamLead: TeamLeadInfo | null;
  candidatesUnderTeamLead: CandidateSchema[] | [];
  candidatesReassigned:
    | Array<{
        teamLeadId: string;
        assignedCandidates: CandidateSchema[];
      }>
    | [];
};

export type TeamLeadInactivateAction = {
  setInactivatingTeamLead: (teamLead: TeamLeadInfo | null) => void;
  updateCandidates: (candidatesUnderTeamLead: CandidateSchema[] | []) => void;
  removeCandidate: ({
    assignedTeamLeadId,
    candidatetoRemove,
  }: {
    assignedTeamLeadId: string;
    candidatetoRemove: CandidateSchema;
  }) => void;
  reAssignCandidate: ({
    teamLeadId,
    assignedCandidates,
  }: {
    teamLeadId: string;
    assignedCandidates: CandidateSchema[];
  }) => void;
};

export type TeamLeadInactivateSlice = TeamLeadInactivateState &
  TeamLeadInactivateAction;

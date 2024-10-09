import { StateCreator } from "zustand";
import { TeamLeadInactivateSlice, TeamLeadInactivateState } from "./type";

const initialState: TeamLeadInactivateState = {
  inactivatingTeamLead: null,
  candidatesUnderTeamLead: [],
  candidatesReassigned: [],
};

export const createTeamLeadInactivateSlice: StateCreator<
  TeamLeadInactivateSlice
> = (set, get) => ({
  ...initialState,
  updateCandidates: (candidatesUnderTeamLead) => {
    set(() => ({ candidatesUnderTeamLead }));
  },
  setInactivatingTeamLead: (teamLead) => {
    set(() => ({ inactivatingTeamLead: teamLead }));
  },
  removeCandidate: ({ assignedTeamLeadId, candidatetoRemove }) => {
    set((state) => ({
      candidatesReassigned: state.candidatesReassigned.map((candidate) =>
        candidate.teamLeadId === assignedTeamLeadId
          ? {
              ...candidate,
              assignedCandidates: candidate.assignedCandidates.filter(
                (candidateInfo) =>
                  candidateInfo.candidateId !== candidatetoRemove.candidateId,
              ),
            }
          : candidate,
      ),
    }));
  },
  reAssignCandidate: ({ teamLeadId, assignedCandidates }) => {
    const isTeamLeadIdExist = get().candidatesReassigned.find(
      (candidate) => candidate.teamLeadId === teamLeadId,
    );
    if (isTeamLeadIdExist) {
      set((state) => ({
        candidatesReassigned: state.candidatesReassigned.map((candidate) =>
          candidate.teamLeadId === teamLeadId
            ? {
                ...candidate,
                assignedCandidates: [
                  ...candidate.assignedCandidates,
                  ...assignedCandidates,
                ],
              }
            : candidate,
        ),
      }));
    } else {
      set((state) => ({
        candidatesReassigned: [
          ...state.candidatesReassigned,
          { teamLeadId, assignedCandidates },
        ],
      }));
    }
  },
});

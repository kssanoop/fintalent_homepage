import { StateCreator } from "zustand";
import { ManagerInactivateSlice, ManagerInactivateState } from "./type";

const initialState: ManagerInactivateState = {
  inactivatingManager: null,
  teamLeadsUnderManager: [],
  companiesUnderManager: [],
  teamLeadsReassigned: [],
  companiesReassigned: [],
  teamLeads: [],
  companies: [],
};

export const createManagerInactivateSlice: StateCreator<
  ManagerInactivateSlice
> = (set, get) => ({
  ...initialState,
  setInactivatingManager: (manager) => {
    set(() => ({ inactivatingManager: manager }));
  },
  updateTeamLeads: (teamLeadsUnderManager) => {
    set(() => ({ teamLeadsUnderManager }));
  },
  updateCompanies: (companiesUnderManager) => {
    set(() => ({ companiesUnderManager }));
  },
  reAssignTeamLead: ({ managerId, assignedTeamLeads }) => {
    const isManagerIdExist = get().teamLeadsReassigned.find(
      (company) => company.managerId === managerId,
    );
    if (isManagerIdExist) {
      set((state) => ({
        teamLeadsReassigned: state.teamLeadsReassigned.map((teamLead) =>
          teamLead.managerId === managerId
            ? {
                ...teamLead,
                assignedCompanies: [
                  ...teamLead.assignedTeamLeads,
                  ...assignedTeamLeads,
                ],
              }
            : teamLead,
        ),
      }));
    } else {
      set((state) => ({
        teamLeadsReassigned: [
          ...state.teamLeadsReassigned,
          { managerId, assignedTeamLeads },
        ],
      }));
    }
  },
  reAssignCompany: ({ managerId, assignedCompanies }) => {
    const isManagerIdExist = get().companiesReassigned.find(
      (company) => company.managerId === managerId,
    );
    if (isManagerIdExist) {
      set((state) => ({
        companiesReassigned: state.companiesReassigned.map((company) =>
          company.managerId === managerId
            ? {
                ...company,
                assignedCompanies: [
                  ...company.assignedCompanies,
                  ...assignedCompanies,
                ],
              }
            : company,
        ),
      }));
    } else {
      set((state) => ({
        companiesReassigned: [
          ...state.companiesReassigned,
          { managerId, assignedCompanies },
        ],
      }));
    }
  },
  removeCompany: ({ assignedManagerId, companyToRemove }) => {
    set((state) => ({
      companiesReassigned: state.companiesReassigned.map((company) =>
        company.managerId === assignedManagerId
          ? {
              ...company,
              assignedCompanies: company.assignedCompanies.filter(
                (companyInfo) => companyInfo._id !== companyToRemove._id,
              ),
            }
          : company,
      ),
    }));
  },
  removeTeamLead: ({ assignedManagerId, teamLeadToRemove }) => {
    set((state) => ({
      teamLeadsReassigned: state.teamLeadsReassigned.map((teamLead) =>
        teamLead.managerId === assignedManagerId
          ? {
              ...teamLead,
              assignedTeamLeads: teamLead.assignedTeamLeads.filter(
                (teamLeadInfo) =>
                  teamLeadInfo.teamLeadId !== teamLeadToRemove.teamLeadId,
              ),
            }
          : teamLead,
      ),
    }));
  },
  resetManagerReassign: () => {
    set(initialState);
  },
});

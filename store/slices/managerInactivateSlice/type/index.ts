import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import { ManagerInfoWithRole } from "@/features/admin/manager/type/manager-info";

export type ManagerInactivateState = {
  inactivatingManager: ManagerInfoWithRole | null;
  teamLeadsUnderManager: TeamLeadInfo[] | [];
  companiesUnderManager: CompanyDataType[] | [];
  teamLeadsReassigned:
    | Array<{
        managerId: string;
        assignedTeamLeads: TeamLeadInfo[];
      }>
    | [];
  companiesReassigned:
    | Array<{
        managerId: string;
        assignedCompanies: CompanyDataType[];
      }>
    | [];
  teamLeads: TeamLeadInfo[] | [];
  companies: CompanyDataType[] | [];
};

export type ManagerInactivateAction = {
  setInactivatingManager: (manager: ManagerInfoWithRole | null) => void;
  updateTeamLeads: (teamLeadsUnderManager: TeamLeadInfo[] | []) => void;
  updateCompanies: (companiesUnderManager: CompanyDataType[] | []) => void;
  reAssignTeamLead: ({
    managerId,
    assignedTeamLeads,
  }: {
    managerId: string;
    assignedTeamLeads: TeamLeadInfo[];
  }) => void;
  reAssignCompany: ({
    managerId,
    assignedCompanies,
  }: {
    managerId: string;
    assignedCompanies: CompanyDataType[];
  }) => void;
  removeCompany: ({
    assignedManagerId,
    companyToRemove,
  }: {
    assignedManagerId: string;
    companyToRemove: CompanyDataType;
  }) => void;
  removeTeamLead: ({
    assignedManagerId,
    teamLeadToRemove,
  }: {
    assignedManagerId: string;
    teamLeadToRemove: TeamLeadInfo;
  }) => void;
  resetManagerReassign: () => void;
};

export type ManagerInactivateSlice = ManagerInactivateState &
  ManagerInactivateAction;

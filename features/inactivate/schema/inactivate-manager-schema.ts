export type InactivateManagerSchema = {
  teamLeads: Array<{
    managerId: string;
    assignedTeamLeads: string[] | [];
  }>;
  companies: Array<{
    managerId: string;
    assignedCompanies: string[] | [];
  }>;
};

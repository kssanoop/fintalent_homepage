export type ManagerInfo = {
  managerId: string;
  name: string;
  employeeId: string;
  email: string;
  department?: string;
  designation: string;
  phoneNo: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  teamLeads: Array<{
    teamLeadId: string;
    name: string;
  }>;
  companies: Array<{
    companyName: string;
    companyNo: string;
  }>;
  docStatus?: "active" | "inactive";
};

export type ManagerInfoWithRole = ManagerInfo & {
  role: string;
};

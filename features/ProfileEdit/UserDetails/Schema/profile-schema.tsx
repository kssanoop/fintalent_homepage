export interface TeamLead {
  accountVerifiedStatus: string;
  createdAt: string;
  designation: string;
  docStatus: string;
  email: string;
  employeeId: string;
  managerId: string;
  name: string;
  phoneNo: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  role: string;
  teamLeadId: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface personalDetails {
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  summary: string;
  fullName: string;
  phoneNo: string;
  email: string;
  linkedInProfile: string;
  currentOrganization: string;
  jobTitle: string;
  profileVerified?: boolean;
  totalExperience?: { year: string; month: string };
  docStatus?: string;
  teamLead?: TeamLead;
  reopenRequest?: boolean;
  accountVerifiedStatus?: string;
}

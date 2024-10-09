export type TeamLeadInfo = {
  teamLeadId: string;
  name: string;
  employeeId: string;
  email: string;
  candidates: Array<{
    candidateId: string;
    fullName: string;
  }>;
  designation: string;
  phoneNo: string;
  role: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  docStatus?: "inactive" | "active";
  candidateAprovalModeStatus: boolean;
};

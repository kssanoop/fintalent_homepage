interface RecruiterInfo {
  recruiterId: string;
  fullName: string;
  email: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
}

interface CompanyInfo {
  _id: string;
  companyName: string;
  companyLogo: {
    originalName: string;
    storageName: string;
  };
}

interface TeamLeadInfo {
  teamLeadId: string;
  name: string;
  email: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
}

export interface TagsDataType {
  _id: string;
  tagCode: string;
  location: string;
  jobTitle: string;
  skills: string[];
  qualifications: string[];
  other: string;
  candidateCount: number;
  candidateIds: string[];
  sendToRecruiter: boolean;
  docStatus: string;
  createdAt: string;
  updatedAt: string;
  experienceLevel: string;
  recruiter: RecruiterInfo;
  company: CompanyInfo;
  teamleads: TeamLeadInfo[];
}

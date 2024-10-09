export type teamleads = Array<{
  teamLeadId: string;
  name: string;
  email: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
}>;

export type TagsInfo = {
  _id: string;
  tagCode: string;
  location: string;
  jobTitle: string;
  skills: string[];
  other: string;
  candidateCount: number;
  candidateIds: string[];
  sendToRecruiter: boolean;
  docStatus: string;
  createdAt: string;
  updatedAt: string;
  experienceLevel: string;
  recruiter: {
    recruiterId: string;
    fullName: string;
    email: string;
    profilePhoto: {
      originalName: string;
      storageName: string;
    };
  };
  company: {
    _id: string;
    companyName: string;
    companyLogo: {
      originalName: string;
      storageName: string;
    };
  };
  teamleads: teamleads;
};

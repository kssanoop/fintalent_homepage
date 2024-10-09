export type InterviewData = {
  accepted: boolean;
  candidateId: string;
  company: {
    companyLogo: {
      originalName: string;
      storageName: string;
    };
    companyName: string;
    companyId: string;
  };
  duration: number;
  interviewUrl: string;
  job: {
    jobTitle: string;
    jobApplicationId: string;
    jobId: string;
  };
  recruiter: {
    fullName: string;
    profilePhoto: {
      originalName: string;
      storageName: string;
    };
    recruiterId: string;
  };
  startDateTime: string;
  _id: string;
  chat?: {
    _id: string;
  };
};

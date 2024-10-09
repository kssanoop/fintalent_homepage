export type NotificationsCount = {
  totalCount: number;
  jobCount: number; // admin, candidate, recruiter, TL
  tagCount?: number; // admin, recruiter
  companyCount?: number; // admin
  candidateCount?: number; // admin, manager, TL
  recruiterCount?: number; //  manager
  teamLeadCount?: number; // manager
  chatCount?: number; // candidate, recruiter
  interviewcount?: number; // candidate, recruiter
};

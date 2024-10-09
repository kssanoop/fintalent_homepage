interface EmploymentDetail {
  companyName: string;
  currentlyWorkingHere: boolean;
  employmentType: string;
  endDate: string;
  jobLocation: string;
  startDate: string;
  jobTitle: string;
  summary: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type EmploymentDetails = EmploymentDetail[];

export interface EmploymentHistory {
  employmentDetails: Array<{
    companyName: string;
    jobTitle: string;
    employmentType: string;
    jobLocation: string;
    startDate: string;
    endDate: string;
    currentlyWorkingHere: boolean;
    summary: string;
  }>;
}

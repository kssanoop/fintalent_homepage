import { EmploymentMode } from "@/types/filter";
import { JobStatus } from "../type/job-status";

// export type AllJobsSchemaResponse = {
//   data: AllJobsSchema;
//   message: string;
//   success: boolean;
//   count: number;
//   offset: number;
//   limit: number;
// };

export type AllJobsSchema = Job[];

export type CompanyLogo = {
  originalName: string;
  storageName: string;
};

interface Recruiter {
  accountVerifiedStatus: string;
  companyId: string;
  designation: string;
  docStatus: string;
  email: string;
  fullName: string;
  linkedIn: string;
  location: string;
  phoneNo: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
}

export type Job = {
  _id: string;
  companyId: {
    companyLogo: CompanyLogo;
    companyName: string;
  };
  recruiter: Recruiter;
  recruiterId: string;
  jobTitle: string;
  jobDescription: string;
  employmentMode: EmploymentMode;
  jobLocation: string;
  jobType: string[];
  jobSchedule: string;
  qualifications: string[];
  skills: string[];
  experianceLevel: string;
  minSalary: number;
  maxSalary: number;
  questions: any[];
  jobStatus: JobStatus;
  docStatus: string;
  createdAt: string;
  updatedAt: string;
};

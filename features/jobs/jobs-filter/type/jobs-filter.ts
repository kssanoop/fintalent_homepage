import {
  EmploymentMode,
  EmploymentType,
  ExperianceLevel,
  JobSchedule,
} from "@/types/filter";
import { JobStatus } from "../../type/job-status";

export type JobsFilter = {
  jobType: EmploymentType[];
  location: string[];
  experianceLevel: ExperianceLevel[];
  employmentMode: EmploymentMode[];
  jobSchedule: JobSchedule[];
  qualifications: string[];
  skills: string[];
  datePosted: string;
  jobStatus: JobStatus | "";
  salaryBegin: string;
  salaryEnd: string;
};

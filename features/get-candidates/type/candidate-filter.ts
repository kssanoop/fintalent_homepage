import {
  AgeRange,
  EmploymentMode,
  EmploymentType,
  ExperianceLevel,
  // JobSchedule,
} from "@/types/filter";

export type CandidateFilters = {
  employmentType: EmploymentType[];
  location: string[];
  experianceLevel: ExperianceLevel[];
  employmentMode: EmploymentMode[];
  ageRange: AgeRange[];
  // jobSchedule: JobSchedule[];
  skills: string[];
  gender: string[];
  qualification: string[];
  noticePeriod: string;
  availableFrom: string;
  dateOfVerification: string;
  salaryBegin: string;
  salaryEnd: string;
};

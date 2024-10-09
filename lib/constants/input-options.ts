import { NOTICE_PERIOD } from "@/features/auth/candidate/login/components/basic-details";

export const employmentTypeOptions = [
  { name: "Full - Time", slug: "fullTime", sortKey: "FULL_TIME" },
  { name: "Part - Time", slug: "partTime", sortKey: "PART_TIME" },
  { name: "Internship", slug: "internship", sortKey: "INTERNSHIP" },
  { name: "Contractual", slug: "contractual", sortKey: "CONTRACTION" },
];
export const experienceLevelOptions = [
  { name: "Fresher", slug: "fresher", sortKey: "FRESHER" },
  { name: "0 - 6 months", slug: "0-6Months", sortKey: "0_6_MONTHS" },
  { name: "6 mo - 1 yr", slug: "6Months-1Year", sortKey: "6MO_1YR" },
  { name: "1 - 3 years", slug: "1-3Years", sortKey: "1_3YR" },
  { name: "3 - 5 years", slug: "3-5Years", sortKey: "3_5YR" },
  { name: "5 - 8 years", slug: "5-8Years", sortKey: "5_8YR" },
  { name: "8+ years", slug: "8+Years", sortKey: "8+_YEARS" },
];
export const employmentModeOptions = [
  { name: "On site", slug: "onSite", sortKey: "ONSITE" },
  { name: "Hybrid", slug: "hybrid", sortKey: "HYBRID" },
  { name: "Remote", slug: "remote", sortKey: "REMOTE" },
];

export const jobScheduleOptions = [
  { name: "Morning", slug: "morning", sortKey: "MORNING" },
  { name: "Afternoon", slug: "evening", sortKey: "EVENING" },
  { name: "US", slug: "us", sortKey: "US" },
  { name: "Flexible", slug: "flexible", sortKey: "FLEXIBLE" },
];

export const genderOptions = [
  { name: "Male", slug: "male", sortKey: "male" },
  { name: "Female", slug: "female", sortKey: "female" },
  { name: "Other", slug: "other", sortKey: "other" },
];

export const ageOptions = [
  { name: "21-25", slug: "21-25", sortKey: "21-25" },
  { name: "25-30", slug: "25-30", sortKey: "25-30" },
  { name: "30-35", slug: "30-35", sortKey: "30-35" },
  { name: "35+Yrs", slug: "35+Yrs", sortKey: "35+Yrs" },
];

export const noticePeriodOptions = NOTICE_PERIOD;

export const jobStatusOptions = [
  { name: "Hiring", slug: "open", sortKey: "open" },
  { name: "Closed", slug: "closed", sortKey: "closed" },
  { name: "On Hold", slug: "hold", sortKey: "hold" },
];

export const educationLevelOptions = [
  "Professional",
  "Masters",
  "Bachelors",
  "Diploma",
  "Others",
];

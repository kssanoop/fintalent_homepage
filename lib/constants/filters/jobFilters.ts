export type CheckboxitemOptions = {
  name: string;
  slug: string;
};

export type JobFilterOption = {
  name: string;
  slug: string;
  sortKey: string;
};

export type Checkboxitem = {
  title: string;
  query: string;
  filterType: "checkbox";
  options: JobFilterOption[];
};

export type TextboxItem = {
  title: string;
  query: string;
  filterType: "textbox";
};
export type TextboxItemRow = [
  {
    title: string;
    query: string;
    filterType: "textbox";
  },
  {
    title: string;
    query: string;
    filterType: "textbox";
  },
];

export type SelectItem = {
  title: string;
  query: string;
  filterType: "select";
  options: JobFilterOption[];
};

export type SalaryRangeItem = {
  title: "Salary Range";
  query: "salary_range";
  filterType: "salary range";
};

export type JobFilterItem =
  | Checkboxitem
  | TextboxItem
  | SelectItem
  | SalaryRangeItem;

export type JobFilters = JobFilterItem[];

export const defaultJobFIlters: JobFilters = [
  {
    title: "Job Type",
    query: "job_type",
    filterType: "checkbox",
    options: [
      { name: "Full - Time", slug: "full_time", sortKey: "FULL_TIME" },
      { name: "Internship", slug: "internship", sortKey: "INTERNSHIP" },
      { name: "Contractual", slug: "contractual", sortKey: "CONTRACTION" },
    ],
  },
  {
    title: "Location",
    query: "location",
    filterType: "textbox",
  },
  {
    title: "Experience Level",
    query: "exp_lvl",
    filterType: "checkbox",
    options: [
      { name: "Fresher", slug: "fresher", sortKey: "FRESHER" },
      { name: "0 - 6 months", slug: "0_6_months", sortKey: "0_6_MONTHS" },
      { name: "6 mo - 1 yr", slug: "6mo_1_yr", sortKey: "6MO_1YR" },
      { name: "1 - 3 year", slug: "1_3_year", sortKey: "1_3YR" },
      { name: "3+ years", slug: "3+_years", sortKey: "3+_YEARS" },
      { name: "Managerial", slug: "managerial", sortKey: "MANAGERIAL" },
    ],
  },
  {
    title: "On site/Remote/WFA",
    query: "onsite",
    filterType: "checkbox",
    options: [
      { name: "On site", slug: "on_site", sortKey: "ONSITE" },
      { name: "Hybrid", slug: "hybrid", sortKey: "HYBRID" },
      { name: "Remote", slug: "remote", sortKey: "REMOTE" },
    ],
  },
  {
    title: "Shift",
    query: "shift",
    filterType: "checkbox",
    options: [
      { name: "Morning", slug: "morning", sortKey: "MORNING" },
      { name: "Night", slug: "night", sortKey: "NIGHT" },
      { name: "Flexible", slug: "flexible", sortKey: "FLEXIBLE" },
    ],
  },
];

export const jobFilters: JobFilters = [
  ...defaultJobFIlters,
  {
    title: "Date posted",
    query: "date_posted",
    filterType: "textbox",
  },
  {
    title: "Job status",
    query: "job_status",
    filterType: "select",
    options: [
      { name: "Open", slug: "open", sortKey: "OPEN" },
      { name: "Close", slug: "close", sortKey: "CLOSE" },
    ],
  },
  {
    title: "Salary Range",
    query: "salary_range",
    filterType: "salary range",
  },
];

export const defaultCandidateFilters: JobFilters = [
  {
    title: "Job Type",
    query: "job_type",
    filterType: "checkbox",
    options: [
      { name: "Full - Time", slug: "full_time", sortKey: "FULL_TIME" },
      { name: "Internship", slug: "internship", sortKey: "INTERNSHIP" },
      { name: "Contractual", slug: "contractual", sortKey: "CONTRACTION" },
    ],
  },
  {
    title: "Experience Level",
    query: "exp_lvl",
    filterType: "checkbox",
    options: [
      { name: "Fresher", slug: "fresher", sortKey: "FRESHER" },
      { name: "0 - 6 months", slug: "0_6_months", sortKey: "0_6_MONTHS" },
      { name: "6 mo - 1 yr", slug: "6mo_1_yr", sortKey: "6MO_1YR" },
      { name: "1 - 3 year", slug: "1_3_year", sortKey: "1_3YR" },
      { name: "3+ years", slug: "3+_years", sortKey: "3+_YEARS" },
      { name: "Managerial", slug: "managerial", sortKey: "MANAGERIAL" },
    ],
  },
  {
    title: "Location",
    query: "location",
    filterType: "textbox",
  },
  {
    title: "On site/Remote/WFA",
    query: "onsite",
    filterType: "checkbox",
    options: [
      { name: "On site", slug: "on_site", sortKey: "ONSITE" },
      { name: "Hybrid", slug: "hybrid", sortKey: "HYBRID" },
      { name: "Remote", slug: "remote", sortKey: "REMOTE" },
    ],
  },
  {
    title: "Salary Range",
    query: "salary_range",
    filterType: "salary range",
  },
];

export const CandidateFilters: JobFilters = [
  ...defaultCandidateFilters,
  {
    title: "Skills",
    query: "skills",
    filterType: "textbox",
  },
  {
    title: "Qualification",
    query: "qalification",
    filterType: "textbox",
  },
  {
    title: "Salary Range",
    query: "salary_range",
    filterType: "salary range",
  },
  {
    title: "Gender",
    query: "gender",
    filterType: "select",
    options: [
      { name: "Male", slug: "male", sortKey: "MALE" },
      { name: "Female", slug: "female", sortKey: "FEMALE" },
      { name: "Other", slug: "other", sortKey: "OTHER" },
    ],
  },
  {
    title: "Age",
    query: "age",
    filterType: "textbox",
  },
];

import {
  employmentTypeOptions,
  experienceLevelOptions,
  employmentModeOptions,
  genderOptions,
  ageOptions,
} from "../input-options";

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
  query: "employmentType" | "experianceLevel" | "employmentMode";
  filterType: "checkbox";
  options: JobFilterOption[];
};

export type TextboxItem = {
  title: string;
  query: string;
  filterType: "textbox";
  placeholder?: string;
};

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

export type CandidateFilterItem =
  | Checkboxitem
  | TextboxItem
  | SelectItem
  | SalaryRangeItem;

export type CandidateFilters = CandidateFilterItem[];

export const defaultCandidateFilters: CandidateFilters = [
  {
    title: "Job Type",
    query: "employmentType",
    filterType: "checkbox",
    options: employmentTypeOptions,
  },
  {
    title: "Location",
    query: "location",
    filterType: "textbox",
  },
  {
    title: "Experience Level",
    query: "experianceLevel",
    filterType: "checkbox",
    options: experienceLevelOptions,
  },
  {
    title: "On site/Remote/WFA",
    query: "employmentMode",
    filterType: "checkbox",
    options: employmentModeOptions,
  },
  {
    title: "Salary Range",
    query: "salary_range",
    filterType: "salary range",
  },
];

export const candidateFilters: CandidateFilters = [
  ...defaultCandidateFilters,

  {
    title: "Skills",
    query: "skills",
    filterType: "textbox",
  },
  {
    title: "Qualification",
    query: "qualification",
    filterType: "textbox",
  },

  {
    title: "Gender",
    query: "gender",
    filterType: "select",
    options: genderOptions,
  },
  {
    title: "Age",
    query: "age",
    filterType: "select",
    options: ageOptions,
  },
  {
    title: "Available from",
    query: "availableFrom",
    filterType: "textbox",
    placeholder: "YYYY/MM/DD",
  },
  {
    title: "Date of profile verification",
    query: "dateOfVerification",
    filterType: "textbox",
    placeholder: "YYYY/MM/DD",
  },
];

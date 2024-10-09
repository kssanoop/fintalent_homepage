import { experienceLevelOptions, jobScheduleOptions } from "./input-options";

export type TextField = {
  name: "jobLocation" | "jobTitle";
  labelTitle: string;
  labelDescription: string;
  fieldType: "text";
  placeholder: string;
};

export type TextAreaField = {
  name: "jobDescription";
  labelTitle: string;
  labelDescription: string;
  fieldType: "textarea";
  placeholder: string;
};

export type RadioField = {
  name: "employmentMode" | "jobSchedule";
  labelTitle: string;
  labelDescription: string;
  fieldType: "radio";
  options: Array<{ label: string; value: string }>;
};

export type CheckboxField = {
  name: "jobType";
  labelTitle: string;
  labelDescription: string;
  fieldType: "checkbox";
  options: Array<{
    label: string;
    value: "fullTime" | "internship" | "contractual";
  }>;
};

export type SelectField = {
  name: "experianceLevel";
  labelTitle: string;
  fieldType: "select";
  options: Array<{ label: string; value: string }>;
};

export type RangeField = {
  name: string;
  labelTitle: string;
  labelDescription: string;
  fieldType: "range";
  range: {
    from: { name: "minSalary"; label: string };
    to: { name: "maxSalary"; label: string };
  };
};

export type CustomField = {
  name: string;
  labelTitle: string;
  labelDescription: string;
  fieldType: "custom";
};

export type JobFormField =
  | TextField
  | TextAreaField
  | RadioField
  | CheckboxField
  | SelectField
  | RangeField
  | CustomField;

const generateOptions = (arr: Array<{ name: string; slug: string }>) => {
  return arr.map((option) => ({
    label: option.name,
    value: option.slug,
  }));
};

export const jobFormFields: JobFormField[] = [
  {
    name: "jobTitle",
    labelTitle: "Job Title",
    labelDescription: "Enter the title for the role",
    fieldType: "text",
    placeholder: "e.g. “Finance manager”",
  },
  {
    name: "jobDescription",
    labelTitle: "Job Description",
    labelDescription:
      "Provide a short description about the job, keep it short and to the point.",
    fieldType: "textarea",
    placeholder: "Description",
  },
  {
    name: "employmentMode",
    labelTitle: "On site/Remote",
    labelDescription: "Choose employment mode",
    fieldType: "radio",
    options: [
      { label: "On site", value: "onSite" },
      { label: "Remote", value: "remote" },
      { label: "Hybrid", value: "hybrid" },
    ],
  },
  {
    name: "jobLocation",
    labelTitle: "Job location",
    labelDescription: "Select where you want to appoint candidates to.",
    fieldType: "text",
    placeholder: "Type here",
  },
  {
    name: "jobType",
    labelTitle: "Job type",
    labelDescription: "Choose employment type",
    fieldType: "checkbox",
    options: [
      { label: "Full time", value: "fullTime" },
      { label: "Internship", value: "internship" },
      { label: "Contractual", value: "contractual" },
    ],
  },
  {
    name: "jobSchedule",
    labelTitle: "Job schedule",
    labelDescription: "Choose schedule/shifts for this job.",
    fieldType: "radio",
    options: generateOptions(jobScheduleOptions),
  },
  {
    name: "qualifications",
    labelTitle: "Qualification",
    labelDescription: "",
    fieldType: "custom",
  },
  {
    name: "skills",
    labelTitle: "Skills required",
    labelDescription: "",
    fieldType: "custom",
  },
  {
    name: "experianceLevel",
    labelTitle: "Experience level",
    fieldType: "select",
    options: experienceLevelOptions.map(
      (option) =>
        ({
          label: option.name,
          value: option.slug,
        }) as SelectField["options"][0],
    ),
  },
  {
    name: "salaryRange",
    labelTitle: "Salary range",
    labelDescription: "Choose how much you prefer to pay for this job.",
    fieldType: "range",
    range: {
      from: { name: "minSalary", label: "Min. Salary " },
      to: { name: "maxSalary", label: "Max. Salary " },
    },
  },
];

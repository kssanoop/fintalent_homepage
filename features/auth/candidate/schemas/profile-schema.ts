import { UseFormReturn } from "react-hook-form";

interface EmploymentDetail {
  companyName: string;
  jobTitle: string;
  employmentType: string;
  jobLocation: string;
  startDate: string;
  endDate: string;
  currentlyWorkingHere: boolean;
  summary: string;
}

interface EducationDetails {
  educationLevel: string;
  instituteName: string;
  courseName: string;
  startDate: string;
  endDate: string;
  currentlyStudyingHere: boolean;
}

export interface Skills {
  name: string;
  level: string;
}

export interface profileSchema {
  fullName: string;
  phoneNo: string;
  linkedInProfile: string;
  email: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };

  // jobTitle: string;
  // currentOrganization: string;
  // totalExperience: {
  //   month: string;
  //   year: string;
  // };

  jobPreferences: {
    currentCTC: string;
    expectedCTC: string;
    noticePeriod: string;
  };

  resumeDocument: {
    originalName: string;
    storageName: string;
  };

  resumeVideo?: {
    originalName: string;
    storageName: string;
  };

  summary?: string;

  employmentDetails: EmploymentDetail[];

  educationDetails?: EducationDetails[];

  skills?: Skills[];

  personalDetails: {
    gender: string;
    dob: string;
    state: string;
    country: string;
    city: string;
    pincode: string;
    addressLine1: string;
    addressLine2: string;
  };
}

export interface stepForm {
  form: UseFormReturn<profileSchema>;
}

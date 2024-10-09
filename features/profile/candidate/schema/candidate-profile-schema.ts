import { AvailabilitySchema as Availability } from "@/features/availability/schema/availability-schema";

export interface CandidateProfileSchema {
  sucess: boolean;
  data: Data;
  message: string;
}

export interface Data {
  profilePhoto: ProfilePhoto;
  totalExperience: TotalExperience;
  resumeDocument: ResumeDocument;
  resumeVideo: ResumeVideo;
  personalDetails: PersonalDetails;
  jobPreferences: JobPreferences;
  availability: Availability;
  _id: string;
  candidateId: string;
  fullName: string;
  email: string;
  candidateScore: number;
  trustScore: number;
  accountVerifiedStatus: string;
  profileVerified: boolean;
  hired: boolean;
  docStatus: string;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
  skillsPending: any[];
  employmentDetails: EmploymentDetail[];
  educationDetails: EducationDetail[];
  languages: any[];
  __v: number;
  currentOrganization: string;
  jobTitle: string;
  phoneNo: string;
  summary: string;
}

export interface ProfilePhoto {
  originalName: string;
  storageName: string;
}

export interface TotalExperience {
  month: number;
  year: number;
}

export interface ResumeDocument {
  originalName: string;
  storageName: string;
}

export interface ResumeVideo {
  originalName: string;
  storageName: string;
}

export interface PersonalDetails {
  gender: string;
  dob: string;
  state: string;
  country: string;
  city: string;
  pincode: string;
  addressLine1: string;
  addressLine2: string;
}

export interface JobPreferences {
  currentCTC: number;
  expectedCTC: number;
  noticePeriod: number;
  employmentType: any[];
  location: any[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface EmploymentDetail {
  companyName: string;
  employmentType: string;
  jobLocation: string;
  startDate: string;
  endDate: string;
  currentlyWorkingHere: boolean;
}

export interface EducationDetail {
  educationLevel: string;
  instituteName: string;
  courseName: string;
  startDate: string;
  endDate: string;
  currentlyStudyingHere: boolean;
}

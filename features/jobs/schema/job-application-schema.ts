import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";

export type ApprovalStatus = "rejected" | "pending" | "approved";

export type JobApplicationSchema = {
  approvalChecks: {
    candidate: ApprovalStatus;
    recruiter: ApprovalStatus;
    admin: ApprovalStatus;
  };
  _id: string;
  jobId: {
    _id: string;
    companyId: string;
    recruiterId: string;
    jobTitle: string;
    jobDescription: string;
    employmentMode: string;
    jobLocation: string;
    jobType: string[];
    jobSchedule: string;
    experianceLevel: string;
    minSalary: number;
    maxSalary: number;
    adminQuestions: Array<{
      question: string;
      isSelected: boolean;
    }>;
    recruiterQuestions: any[];
    jobStatus: string;
    docStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  candidateId: string;
  candidate: CandidateSchema;
  companyId: {
    companyLogo: {
      originalName: string;
      storageName: string;
    };
    _id: string;
    companyName: string;
    companyNo: string;
    locations: string[];
    companyWebsite: string;
    companyLinkedIn: string;
    companyPhoneNo: string;
    verificationStatus: string;
    companyStatus: string;
    __v: number;
  };
  recruiterId: string;
  status: string;
  questionsAndAnswers: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

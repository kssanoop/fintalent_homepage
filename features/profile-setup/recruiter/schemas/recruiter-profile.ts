import { UseFormReturn } from "react-hook-form";

interface CompanyData {
  companyName: string;
  companyPhoneNo: string;
  companyWebsite: string;
  companyLogo: {
    originalName: string;
    storageName: string;
  };
  companyLinkedIn: string;
  location: string;
}

interface RecruiterData {
  companyId?: string; // Optional when createType is "createCompany"
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  fullName: string;
  designation: string;
  phoneNo: string;
  linkedIn: string;
}

interface CreateRecruiterData {
  createType: "createCompany" | "existingCompany";
  recruiterData: RecruiterData;
  companyData?: CompanyData;
}

type RecruiterFormData = CreateRecruiterData;

export default RecruiterFormData;

export interface stepForm {
  form: UseFormReturn<RecruiterFormData>;
}

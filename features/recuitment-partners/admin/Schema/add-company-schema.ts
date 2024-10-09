export interface AddCompanySchema {
  companyLogo: {
    originalName: string;
    storageName: string;
  };
  companyName: string;
  companyEmail: string;
  locations: string[];
  companyPhoneNo: string;
  companyWebsite: string;
  companyLinkedIn: string;
}

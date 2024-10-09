export type CompanyDataType = {
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
  createdAt: string;
  updatedAt: string;
  managerId: string;
  unverifiedViewCost: number;
  verifiedViewCost: number;
  viewDurationDays: number;
};

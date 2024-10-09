export type RecruiterProfile = {
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  _id: string;
  recruiterId: string;
  fullName: string;
  email: string;
  accountVerifiedStatus: string;
  docStatus: string;
  __v: number;
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
    createdAt: string;
    updatedAt: string;
    managerId: string;
    companyEmail: string;
    unverifiedViewCost: number;
    verifiedViewCost: number;
    viewDurationDays: number;
  };
  designation: string;
  linkedIn: string;
  location: string;
  phoneNo: string;
};

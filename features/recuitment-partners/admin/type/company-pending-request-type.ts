export type companyRequestPendingDataType = {
  accountVerifiedStatus: "pendingVerification";
  companyId: {
    companyLogo: {
      originalName: string;
      storageName: string;
    };
    _id: string;
    companyName: string;
    companyPhoneNo: string;
    locations: string[];
    companyWebsite: string;
    companyLinkedIn: string;
    companyEmail: string;
  };
  designation: string;
  docStatus: "active";
  email: string;
  fullName: string;
  linkedIn: string;
  location: string;
  phoneNo: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  recruiterId: string;
  requestType: "createCompany";
  unverifiedViewCost: number;
  verifiedViewCost: number;
  viewDurationDays: number;
  __v: number;
  _id: string;
};

export type CompanyFormData = {
  companyLogo: {
    originalName: string;
    storageName: string;
  };
  _id: string;
  companyName: string;
  companyPhoneNo: string;
  locations: string[];
  companyWebsite: string;
  companyLinkedIn: string;
  companyEmail: string;
};

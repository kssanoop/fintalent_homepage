export type CandidateSchema = HiredCompany & {
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  totalExperience: {
    month: number;
    year: number;
  };
  resumeDocument: {
    originalName: string;
    storageName: string;
  };
  resumeVideo: {
    originalName: string;
    storageName: string;
  };
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
  jobPreferences: {
    expectedCTC: number;
    currentCTC: number;
    noticePeriod: number;
    location: string[];
    shift: string;
    employmentType: string[];
  };
  availability: {
    timeSlots: {
      sunday: {
        available: boolean;
        timeSlots: string[];
      };
      monday: {
        available: boolean;
        timeSlots: Array<{ startTime: string; endTime: string }>;
      };
      tuesday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      wednesday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      thursday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      friday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      saturday: {
        available: boolean;
        timeSlots: string[];
      };
    };
    availableFrom: string;
    buffer15minBefore: boolean;
    buffer15minAfter: boolean;
  };
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
  skills: Array<{
    name: string;
    level: number;
  }>;
  skillsPending: Array<{
    name: string;
    level: number;
  }>;
  employmentDetails: Array<{
    companyName: string;
    jobTitle: string;
    employmentType: string;
    jobLocation: string;
    startDate: string;
    endDate: string;
    currentlyWorkingHere: boolean;
    summary: string;
  }>;
  educationDetails: Array<{
    educationLevel: string;
    instituteName: string;
    courseName: string;
    startDate: string;
    endDate: string;
    currentlyStudyingHere: boolean;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  __v: number;
  currentOrganization: string;
  jobTitle: string;
  linkedInProfile: string;
  phoneNo: string;
  summary: string;
  jobApplicationStatus: boolean;
  recuiterView: boolean;
  reopenRequest: boolean;
};

export type HiredCompany = {
  hiredCompany: {
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
    companyEmail: string;
    unverifiedViewCost: number;
    verifiedViewCost: number;
    viewDurationDays: number;
    managerId: string;
  };
  hiredDate: string;
};

export type HiredCandidateSchema = {
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  totalExperience: {
    month: number;
    year: number;
  };
  resumeDocument: {
    originalName: string;
    storageName: string;
  };
  resumeVideo: {
    originalName: string;
    storageName: string;
  };
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
  jobPreferences: {
    expectedCTC: number;
    currentCTC: number;
    noticePeriod: number;
    location: string[];
    shift: string;
    employmentType: string[];
  };
  availability: {
    timeSlots: {
      sunday: {
        available: boolean;
        timeSlots: string[];
      };
      monday: {
        available: boolean;
        timeSlots: Array<{ startTime: string; endTime: string }>;
      };
      tuesday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      wednesday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      thursday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      friday: {
        available: boolean;
        timeSlots: Array<{
          startTime: string;
          endTime: string;
        }>;
      };
      saturday: {
        available: boolean;
        timeSlots: string[];
      };
    };
    availableFrom: string;
    buffer15minBefore: boolean;
    buffer15minAfter: boolean;
  };
  _id: string;
  candidateId: string;
  fullName: string;
  hiredCompany: hiredCompany;
  email: string;
  candidateScore: number;
  trustScore: number;
  accountVerifiedStatus: string;
  profileVerified: boolean;
  hired: boolean;
  docStatus: string;
  createdAt: string;
  updatedAt: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
  skillsPending: Array<{
    name: string;
    level: number;
  }>;
  employmentDetails: Array<{
    companyName: string;
    jobTitle: string;
    employmentType: string;
    jobLocation: string;
    startDate: string;
    endDate: string;
    currentlyWorkingHere: boolean;
    summary: string;
  }>;
  educationDetails: Array<{
    educationLevel: string;
    instituteName: string;
    courseName: string;
    startDate: string;
    endDate: string;
    currentlyStudyingHere: boolean;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  entOrganization: string;
  jobTitle: string;
  linkedInProfile: string;
  phoneNo: string;
  summary: string;
  jobApplicationStatus: boolean;
};

interface hiredCompany {
  hired: boolean;
  hiredCompany: boolean;
  companyLinkedIn: string;
  companyLogo: {
    originalName: string;
    storageName: string;
  };
  companyName: string;
  companyNo: string;
  companyPhoneNo: string;
  companyStatus: string;
  companyWebsite: string;
  createdAt: string;
  locations: string[];
  managerId: string;
  updatedAt: string;
  verificationStatus: string;
  __v: number;
  _id: string;
}

interface RecruiterDataType {
  _id: string;
  fullName: string;
  email: string;
  accountVerifiedStatus: "verified" | "unverified";
  docStatus: "active" | "inactive";
  designation: string;
  linkedIn: string;
  location: string;
  phoneNo: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  jobPosted: number;
  candidateVerifiedViews: number;
  candidateUnverifiedViews: number;
  billingAmount: number;
  recruiterId: string;
}

export default RecruiterDataType;

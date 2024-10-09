export interface AddRecruiterSchema {
  fullName: string;
  location: string;
  designation: string;
  phoneNo: string;
  linkedIn: string;
  email: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
}

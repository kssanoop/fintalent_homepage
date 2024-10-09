export type TeamLeadFormSchema = {
  name: string;
  profilePhoto?: {
    originalName: string;
    storageName: string;
  };
  email: string;
  phoneNo: string;
  designation: string;
  role: string;
};

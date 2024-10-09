import { NOTICE_PERIOD } from "../candidate/login/components/basic-details";
import { profileSchema } from "../candidate/schemas/profile-schema";

const defaultValues: profileSchema = {
  fullName: "",
  phoneNo: "",
  linkedInProfile: "",
  email: "",
  profilePhoto: {
    originalName: "",
    storageName: "",
  },
  // jobTitle: "",
  // currentOrganization: "",
  jobPreferences: {
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: NOTICE_PERIOD[1].value,
  },
  // totalExperience: {
  //   month: "",
  //   year: "",
  // },
  resumeDocument: {
    originalName: "",
    storageName: "",
  },
  resumeVideo: {
    originalName: "",
    storageName: "",
  },
  summary: "",
  employmentDetails: [
    {
      companyName: "",
      jobTitle: "",
      employmentType: "",
      jobLocation: "",
      startDate: "",
      endDate: "",
      currentlyWorkingHere: false,
      summary: "",
    },
  ],
  educationDetails: [
    {
      educationLevel: "",
      instituteName: "",
      courseName: "",
      startDate: "",
      endDate: "",
      currentlyStudyingHere: false,
    },
  ],
  skills: [
    {
      name: "",
      level: "01",
    },
  ],
  personalDetails: {
    gender: "",
    dob: "",
    state: "",
    country: "India",
    city: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
  },
};

export default defaultValues;

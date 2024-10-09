export interface EducationDetail {
  courseName: string;
  currentlyStudyingHere: boolean;
  educationLevel: string;
  endDate?: string | undefined;
  instituteName: string;
  startDate: string;
}

export type EducationDetails = EducationDetail[];

export interface EducationHistory {
  educationDetails: Array<{
    educationLevel: string;
    instituteName: string;
    courseName: string;
    startDate: string;
    endDate: string;
    currentlyStudyingHere: boolean;
  }>;
}

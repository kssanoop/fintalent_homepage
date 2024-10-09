export type AddQuestions = {
  question: string;
  type: "admin" | "recruiter";
  id: string;
  isSelected: boolean;
};

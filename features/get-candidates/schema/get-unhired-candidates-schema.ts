import { CandidateSchema } from "./candidate-schema";

export type GetUnhiredCandidatesSchema = {
  success: boolean;
  data: CandidateSchema[];
  message: string;
  count: number;
  offset: number;
  limit: number;
};

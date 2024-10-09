import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type AddQuestion = {
  question: string;
  jobId: string;
};

export const addJobQuestionById = async ({ question, jobId }: AddQuestion) => {
  return await axios.post(`/job/question/${jobId}`, question);
};

export const useAddJobQuestionById = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: addJobQuestionById,
    mutationKey: ["addJobsQuestion"],
    onSuccess: (response) => {
      console.log("response from add job question", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

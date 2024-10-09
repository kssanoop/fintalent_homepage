import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type ToggleJobQuestionType = {
  jobId: string;
  questionId: string;
};

export const ToggleJobQuestionById = async ({
  jobId,
  questionId,
}: ToggleJobQuestionType) => {
  return await axios.put(`/job/question/${jobId}/${questionId}`);
};

export const useToggleJobQuestionById = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: ToggleJobQuestionById,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

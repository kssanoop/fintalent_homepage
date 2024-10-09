import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type DeleteJobQuestionType = {
  jobId: string;
  questionId: string;
};

export const deleteJobQuestionById = async ({
  jobId,
  questionId,
}: DeleteJobQuestionType) => {
  return await axios.delete(`/job/question/${jobId}/${questionId}`);
};

export const useDeleteJobQuestionById = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: deleteJobQuestionById,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

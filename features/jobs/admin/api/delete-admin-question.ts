import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface deleteQuestionsAdminProps {
  index: number;
}

const deleteQuestionsAdmin = async ({ index }: deleteQuestionsAdminProps) => {
  return await axios.delete(`/misc/questions/${index}`);
};

export const useDeleteQuestionAdmin = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: deleteQuestionsAdmin,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

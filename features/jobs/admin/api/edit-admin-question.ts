import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface editQuestionsAdminProps {
  data: any;
  index: number;
}

const editQuestionsAdmin = async ({ data, index }: editQuestionsAdminProps) => {
  return await axios.put(`/misc/questions/${index}`, data);
};

export const useEditQuestionAdmin = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: editQuestionsAdmin,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

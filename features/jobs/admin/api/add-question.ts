import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const addQuestionsAdmin = async (data: any) => {
  return await axios.post("/misc/questions", data);
};

export const useAddQuestionAdmin = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: addQuestionsAdmin,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

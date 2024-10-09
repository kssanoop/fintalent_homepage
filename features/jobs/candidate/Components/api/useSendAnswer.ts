import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { FormSubmitSchema } from "../accpetjobquestion";

// Update the postAnswer function to accept an array of questions
export const postAnswer = async (jobApplicationId: string, data: any) => {
  return await axios.post(
    `/job/application/accept-invite/${jobApplicationId}`,
    data,
  );
};

// Update the usePostAnswer hook to accept an array of questions
export const usePostAnswer = (
  handleSuccess: any,
  handleError: any,
  id: string,
) => {
  return useMutation({
    mutationFn: async (questions: FormSubmitSchema[] = []) =>
      await postAnswer(id, questions),
    onSuccess: (data) => {
      console.log("Response from post answer:", data);
      handleSuccess(data);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

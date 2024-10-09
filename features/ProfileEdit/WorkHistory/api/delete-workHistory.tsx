import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const deleteWorkHistory = async (data: any) => {
  return await axios.put("/candidate/profile", data);
};

export const useDeleteWorkHistory = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: deleteWorkHistory,
    onSuccess: (response) => {
      console.log("response from delete work history: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

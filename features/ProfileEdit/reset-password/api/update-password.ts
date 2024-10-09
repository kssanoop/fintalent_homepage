import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
const updatePassword = async (data: any) => {
  return await axios.post(`/auth/change-password`, data);
};

export const useUpdatePassword = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: (response) => {
      console.log("response from update psaaword: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

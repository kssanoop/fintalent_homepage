import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const reOpenRequest = async () => {
  return await axios.put("/candidate/profile/reopen");
};

export const useReOpenRequest = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: reOpenRequest,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

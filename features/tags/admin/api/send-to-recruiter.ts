import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const sendToRecruiter = async (tagId: string) => {
  return await axios.put(`/tag/admin/send-to-recruiter/${tagId}`);
};

export const useSendToRecruiter = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: sendToRecruiter,
    onSuccess(response) {
      handleSuccess(response);
    },
    onError(error) {
      handleError(error);
    },
  });
};

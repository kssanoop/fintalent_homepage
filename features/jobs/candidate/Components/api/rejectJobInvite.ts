import { axios } from "@/lib/axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const rejectJobInvite = async (jobApplicationId: string) => {
  return await axios.post(`/job/application/reject-invite/${jobApplicationId}`);
};

export const useRejectJobInvite = (
  handleSuccess: any,
  handleError: any,
  id: string,
): UseMutationResult => {
  return useMutation({
    mutationFn: async () => await rejectJobInvite(id),
    onSuccess: (data) => {
      console.log("Response from Reject Response:", data);
      handleSuccess(data);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const rejectJobOffer = async (jobId: string) => {
  return await axios.post(`/job/application/reject-offer/${jobId}
   `);
};

export const useRejectJobOffer = (
  onSuccess: any,
  onError: any,
  jobId: string,
) => {
  return useMutation({
    mutationFn: async () => await rejectJobOffer(jobId),
    mutationKey: ["reject-job-offer"],
    onSuccess: (data) => {
      console.log("Response from reject job offer:", data);
      onSuccess(data);
    },
    onError: (err) => {
      onError(err);
    },
  });
};

import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const acceptJobOffer = async (jobId: string) => {
  return await axios.post(`/job/application/accept-offer/${jobId}
   `);
};

export const useAcceptJobOffer = (
  onSuccess: any,
  onError: any,
  jobId: string,
) => {
  return useMutation({
    mutationFn: async () => await acceptJobOffer(jobId),
    mutationKey: ["accept-job-offer"],
    onSuccess: (data) => {
      console.log("Response from accept job offer:", data);
      onSuccess(data);
    },
    onError: (err) => {
      onError(err);
    },
  });
};

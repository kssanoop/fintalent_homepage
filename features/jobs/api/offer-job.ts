import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const offerJob = async ({ jobApplicationId }: { jobApplicationId: string }) => {
  return await axios({
    url: `/job/application/offer-job/${jobApplicationId}`,
    method: "POST",
  });
};

export const useOfferJob = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: offerJob,
    onSuccess: (response) => {
      handleSuccess(response);
      queryClient.invalidateQueries({
        queryKey: ["job-application-by-recruiter"],
      });
    },

    onError: (err) => {
      handleError(err);
    },
  });
};

export default useOfferJob;

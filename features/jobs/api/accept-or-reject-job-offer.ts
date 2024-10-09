import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const acceptOrReject = async ({
  jobApplicationId,
  action,
  ctc,
}: {
  jobApplicationId: string;
  action: "accept" | "reject";
  ctc?: string;
}) => {
  return await axios({
    url: `/job/admin/applications/accept-reject-offered/${jobApplicationId}/${action}`,
    method: "PUT",
    data: { approvedCTC: ctc }, // Include ctc in the request payload
  });
};

export const useAcceptOrRejectJobOfferWithCtc = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptOrReject,
    onSuccess: (response) => {
      handleSuccess(response);
      //   queryClient.invalidateQueries({
      //     queryKey: ["job-application-by-recruiter"],
      //   });
    },

    onError: (err) => {
      handleError(err);
    },
  });
};

export default useAcceptOrRejectJobOfferWithCtc;

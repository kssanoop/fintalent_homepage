import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface jobOfferActionProps {
  jobApplicationId: string;
  action: string;
  data: { approvedCTC: string };
}

const jobOfferAction = async ({
  jobApplicationId,
  action,
  data,
}: jobOfferActionProps) => {
  return await axios({
    url: `/job/admin/applications/accept-reject-offered/${jobApplicationId}/${action}`,
    method: "PUT",
    data,
  });
};

export const useJobOfferAction = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: jobOfferAction,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

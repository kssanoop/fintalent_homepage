import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

type rejectCreateCompanyRequestProps = {
  recruiterId: string;
};

export const rejectCreateCompanyRequest = async ({
  recruiterId,
}: rejectCreateCompanyRequestProps) => {
  return await axios.put(`recruiter/company/reject/${recruiterId}`);
};

export const useRejectCreateCompanyRequest = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: rejectCreateCompanyRequest,
    onSuccess: (response) => {
      console.log("response from reject company", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

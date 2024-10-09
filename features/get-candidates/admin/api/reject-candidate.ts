import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const approveOrRejectCandidate = async ({
  candidateId,
  action,
}: {
  candidateId: string;
  action: "reject";
}) => {
  return await axios({
    url: `/candidate/admin/reopen-requests-action/${candidateId}/${action}`,
    method: "PUT",
  });
};

const useRejectCandidate = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: approveOrRejectCandidate,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useRejectCandidate;
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface pendingCandidatesActionProps {
  action: string;
  candidateId: string;
}

export const pendingCandidatesAction = async ({
  action,
  candidateId,
}: pendingCandidatesActionProps) => {
  return await axios
    .put(`/candidate/admin/approve-reject/${candidateId}/${action}`)
    .then((res) => res.data);
};

export const usePendingCandidatesAction = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: pendingCandidatesAction,
    onSuccess: (response) => {
      console.log("hook response:", response);
      handleSuccess(response);
    },
    onError: (err) => {
      console.log("hook response error:", err);
      handleError(err);
    },
  });
};

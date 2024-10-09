import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface CandidateProfileStatusActionProps {
  candidateId: string;
  action: string;
}

const CandidateProfileVerifyAction = async ({
  candidateId,
  action,
}: CandidateProfileStatusActionProps) => {
  return await axios.put(
    `/candidate/admin/verify-profile/${candidateId}/${action}`,
  );
};

export const useCandidateProfileVerifyAction = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: CandidateProfileVerifyAction,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

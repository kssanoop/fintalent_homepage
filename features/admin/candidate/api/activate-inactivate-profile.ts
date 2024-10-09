import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface CandidateProfileStatusActionProps {
  candidateId: string;
  action: string;
}

const CandidateProfileStatusAction = async ({
  candidateId,
  action,
}: CandidateProfileStatusActionProps) => {
  return await axios.put(
    `/candidate/admin/active-inactive/${candidateId}/${action}`,
  );
};

export const useCandidateProfileStatusAction = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: CandidateProfileStatusAction,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type TrustScore = {
  trustScore: string;
};

type UpdateCandidateTrustScore = TrustScore & {
  candidateId: string;
};
export const updateCandidateTrustScore = async ({
  trustScore,
  candidateId,
}: UpdateCandidateTrustScore) => {
  return await axios.put(`/candidate/admin/update-trust-score/${candidateId}`, {
    trustScore,
  });
};

export const useUpdateCandidateTrustScore = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: updateCandidateTrustScore,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type ApproveOrRejectSkillAction = "approve" | "reject";
type ApproveOrRejectSkill = {
  candidateId: string;
  action: ApproveOrRejectSkillAction;
  data: {
    skill: string;
    score: string;
  };
};

export const approveOrRejectSkill = async ({
  candidateId,
  action,
  data,
}: ApproveOrRejectSkill) => {
  return await axios.put(
    `/candidate/admin/approve-reject-skill/${candidateId}/${action}`,
    data,
  );
};

export const useApproveOrRejectSkill = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: approveOrRejectSkill,
    onSuccess: (response) => {
      console.log("response from Add Skill: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

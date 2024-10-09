import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { CandidateApprovalPermissionStatus } from "../types/candidate-approval-permission-status";

const updateCandidateApprovalPermission = async ({
  teamleadId,
  action,
}: {
  teamleadId: string;
  action: CandidateApprovalPermissionStatus;
}) => {
  await axios({
    url: `/admin/teamlead/auto-assign-candidates/${teamleadId}/${action}`,
    method: "PUT",
  });
};

function useUpdateCandidateApprovalPermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCandidateApprovalPermission,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["team-leads-for-admin"],
      });
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
}

export default useUpdateCandidateApprovalPermission;

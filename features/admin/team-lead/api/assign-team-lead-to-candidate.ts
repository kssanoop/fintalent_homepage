import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const assignTeamLeadToCandidateByAdmin = async ({
  teamLeadId,
  candidateId,
}: {
  teamLeadId: string;
  candidateId: string;
}) => {
  return await axios({
    url: `/admin/teamlead/assign-candidates/${teamLeadId}/${candidateId}`,
    method: "PUT",
  });
};

export const useAssignTeamLeadToCandidateByAdmin = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignTeamLeadToCandidateByAdmin,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["get-candidate-by-id"],
      });
      queryClient.invalidateQueries({
        queryKey: ["team-leads-for-manager"],
      });
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useAssignTeamLeadToCandidateByAdmin;

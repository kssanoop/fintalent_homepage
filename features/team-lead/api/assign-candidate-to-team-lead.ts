import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const assignCandidateToTeamLead = async ({
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

export const useAssignCandidateToTeamLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignCandidateToTeamLead,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["unhired-candidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["verified-candidates"],
      });
    },
    onError: (err: any) => {
      toast.error(err || "Assigning candidate to team lead failed");
    },
  });
};

export default useAssignCandidateToTeamLead;

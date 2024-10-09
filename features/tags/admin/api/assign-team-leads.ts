import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface sassignTeamLeadsProps {
  tagId: string;
  teamLeadIds: string[];
}

const assignTeamLeads = async ({
  tagId,
  teamLeadIds,
}: sassignTeamLeadsProps) => {
  return await axios({
    method: "PUT",
    url: `/tag/admin/resaasign-teamlead/${tagId}`,
    data: { teamLeads: teamLeadIds },
  });
};

export const useAssignTeamLeads = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: assignTeamLeads,
    onSuccess(response) {
      handleSuccess(response);
    },
    onError(error) {
      handleError(error);
    },
  });
};

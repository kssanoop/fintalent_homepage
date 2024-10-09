import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const assignTeamLeadByadmin = async ({
  teamLeads,
  managerId,
}: {
  teamLeads: string[];
  managerId: string;
}) => {
  return await axios({
    url: `/admin/manager/assign-teamleads/${managerId}`,
    method: "PUT",
    data: { teamLeads },
  });
};

export const useAssignTeamLeadByAdmin = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignTeamLeadByadmin,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["team-leads-for-admin-under-manager"],
      });
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useAssignTeamLeadByAdmin;

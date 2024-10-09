import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RoleTypes } from "@/types/authorization";

type Args = {
  teamLeadId: string;
};

const activateTeamLead = async ({ teamLeadId }: Args) => {
  return await axios({
    url: `/admin/teamlead/activate-teamlead/${teamLeadId}`,
    method: "PUT",
  });
};

export const useActivateTeamLead = (
  handleSuccess: any,
  role: RoleTypes = "admin",
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateTeamLead,
    onSuccess: (response) => {
      handleSuccess(response);
      // if (role === "admin") {
      queryClient.invalidateQueries({ queryKey: ["team-leads-for-admin"] });
      queryClient.invalidateQueries({ queryKey: ["unhired-candidates"] });
      queryClient.invalidateQueries({ queryKey: ["team-leads-for-manager"] });

      // }
      toast.success("Team lead activated successfully");
    },
    onError: (error) => {
      toast.error("Error activating Team lead");
      console.log(error);
    },
  });
};

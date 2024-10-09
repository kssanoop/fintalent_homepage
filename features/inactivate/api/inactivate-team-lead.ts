import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RoleTypes } from "@/types/authorization";
import { InactivateTeamLeadSchema } from "../schema/inactivate-team-lead-schema";

type Args = {
  teamLeadId: string;
  data: InactivateTeamLeadSchema;
};

const inactivateTeamLead = async ({ teamLeadId, data }: Args) => {
  return await axios({
    url: `/admin/teamlead/inactivate-teamlead/${teamLeadId}`,
    method: "PUT",
    data,
  });
};

export const useInactivateTeamLead = (
  handleSuccess: any,
  role: RoleTypes = "admin",
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inactivateTeamLead,
    onSuccess: (response) => {
      handleSuccess(response);
      if (role === "admin") {
        queryClient.invalidateQueries({ queryKey: ["team-leads-for-admin"] });
        queryClient.invalidateQueries({ queryKey: ["unhired-candidates"] });
        queryClient.invalidateQueries({ queryKey: ["team-leads-for-manager"] });
      }

      toast.success("Team lead inactivated successfully");
    },
    onError: (error) => {
      toast.error("Error inactivating Team lead");
      console.log(error);
    },
  });
};

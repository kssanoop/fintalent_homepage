import { TeamLeadFormSchema } from "@/features/team-lead/schema/team-lead-form-schema";
import { RoleTypes } from "@/types/authorization";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const createTeamLead = async ({
  data,
  role = "admin",
}: {
  data: TeamLeadFormSchema;
  role: RoleTypes;
}) => {
  return await axios({
    url: `/${role}/teamlead`,
    method: "POST",
    data,
  });
};

export const useCreateTeamLead = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: createTeamLead,
    onSuccess: (response: any) => {
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useCreateTeamLead;

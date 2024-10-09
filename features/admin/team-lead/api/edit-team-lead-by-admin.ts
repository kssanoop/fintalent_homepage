import { TeamLeadFormSchema } from "@/features/team-lead/schema/team-lead-form-schema";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const editTeamLeadByAdmin = async ({
  teamLeadId,
  data,
}: {
  teamLeadId: string;
  data: TeamLeadFormSchema;
}) => {
  return await axios({
    url: `/admin/teamlead/${teamLeadId}`,
    method: "PUT",
    data,
  });
};

export const useEditTeamLeadByAdmin = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: editTeamLeadByAdmin,
    onSuccess: (response: any) => {
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useEditTeamLeadByAdmin;

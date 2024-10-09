import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const assignCandidatesUsingFilter = async ({
  teamLeadId,
  filters,
}: {
  teamLeadId: string;
  filters: any;
}) => {
  return await axios({
    url: `/admin/teamlead/assign-candidates-query/${teamLeadId}`,
    method: "PUT",
    data: filters,
  });
};

export const useAssignCandidatesUsingFilter = (handleSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignCandidatesUsingFilter,
    onSuccess: (response: any) => {
      handleSuccess();
      queryClient.invalidateQueries({
        queryKey: ["unhired-candidates"],
      });
    },
    onError: (err: any) => {
      toast.error(err || "Assigning candidate to team lead failed");
    },
  });
};

export default useAssignCandidatesUsingFilter;

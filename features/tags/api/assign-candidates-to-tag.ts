import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const assignCandidateToTag = async ({
  tagId,
  candidateIds,
}: {
  tagId: string;
  candidateIds: string[];
}) => {
  return await axios({
    url: `/tag/teamlead/assign-candidates/${tagId}`,
    method: "PUT",
    data: {
      candidateIds,
    },
  });
};

export const useAssignCandidateToTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignCandidateToTag,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["get-candidates-by-tag-admin"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unhired-candidates"],
      });
    },
    onError: (err: any) => {
      toast.error(err || "Assigning candidate to tag failed");
    },
  });
};

export default useAssignCandidateToTag;

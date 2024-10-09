import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSkill } from "../types/delete-skill";
import { toast } from "sonner";

export const deleteSkill = async ({ index }: DeleteSkill) => {
  return await axios.delete(`/misc/skills/${index}`);
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkill,

    onMutate: async ({ index }) => {
      await queryClient.cancelQueries({ queryKey: ["skills"] });

      const previousSkills = queryClient.getQueryData(["skills"]);

      // Optimistically update to the new value
      //   delete the array item which matches the index
      queryClient.setQueryData(["skills"], (old: any) => {
        old.splice(index, 1);
        return old;
      });

      // Return a context object with the snapshotted value
      return { previousSkills };
    },

    onError: (_err: any, newSkill, context) => {
      queryClient.setQueryData(["skills"], context?.previousSkills);
      toast.error(_err?.response?.data?.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

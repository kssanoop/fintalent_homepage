import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteQualification } from "../type/delete-qualification";
import { toast } from "sonner";

export const deleteQualification = async ({ index }: DeleteQualification) => {
  return await axios.delete(`/misc/qualifications/${index}`);
};

export const useDeleteQualification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQualification,

    onMutate: async ({ index }) => {
      await queryClient.cancelQueries({ queryKey: ["qualifications"] });

      const previousQualifications = queryClient.getQueryData([
        "qualifications",
      ]);

      // Optimistically update to the new value
      //   delete the array item which matches the index
      queryClient.setQueryData(["qualifications"], (old: any) => {
        old.splice(index, 1);
        return old;
      });

      // Return a context object with the snapshotted value
      return { previousQualifications };
    },

    onError: (_err: any, newQualification, context) => {
      queryClient.setQueryData(
        ["qualifications"],
        context?.previousQualifications,
      );
      console.log(_err);
      toast.error(_err?.response?.data?.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });
    },
  });
};

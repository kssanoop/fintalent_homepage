import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const addData = async (data: any) => {
  return await axios.put("/candidate/profile", data);
};

export const useAddData = (handleSuccess: any, handleError: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addData,
    onSuccess: (response) => {
      console.log("response from Add work history: ", response);
      handleSuccess(response);
    },

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["candidate"] });

      const previousQualifications = queryClient.getQueryData(["candidate"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["candidate"], (old: any) => {
        console.log(old);
        const result = { ...old, ...data };
        console.log(result);
        return result;
      });

      // Return a context object with the snapshotted value
      return { previousQualifications };
    },

    onError: (_err: any, newQualification, context) => {
      queryClient.setQueryData(["candidate"], context?.previousQualifications);
      handleError(_err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate"] });
    },
  });
};

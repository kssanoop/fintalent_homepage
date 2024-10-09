import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const createBlocker = async (data: { date: string }) => {
  return await axios({
    url: `/interview/candidate/blocker`,
    method: "POST",
    data,
  });
};

export const useCreateBlocker = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlocker,
    onSuccess: (response) => {
      console.log("response from create blocker: ", response);
      handleSuccess(response);
    },
    // onMutate: async (newDate) => {
    //   await queryClient.cancelQueries({ queryKey: ["blocked-slots"] });

    //   const prevBlockedDates = queryClient.getQueryData(["blocked-slots"]);

    //   // Optimistically update to the new value
    //   //   not completed
    //   queryClient.setQueryData(["blocked-slots"], (oldDates) => [
    //     ...oldDates,
    //     newDate,
    //   ]);

    //   // Return a context object with the snapshotted value
    //   return { prevBlockedDates };
    // },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      //   queryClient.setQueryData(["blocked-slots"], context?.prevBlockedDates);
      handleError(err);
    },
    // Always refetch after error or success:
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["blocked-slots"] });
    // },
  });
};

export default useCreateBlocker;

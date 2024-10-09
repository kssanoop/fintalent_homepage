import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const deleteBlockedSlot = async (id: string) => {
  return await axios({
    url: `/interview/candidate/blocker/${id}`,
    method: "DELETE",
  });
};

export const useDeleteBlockedSlot = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: deleteBlockedSlot,
    onSuccess: (response) => {
      console.log("response from delete blocked slot: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useDeleteBlockedSlot;

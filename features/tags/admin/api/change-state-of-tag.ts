import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface changeTagStateProps {
  tagId: string;
  state: string;
}

const changeTagState = async ({ tagId, state }: changeTagStateProps) => {
  return await axios
    .put(`/tag/admin/active-inactive/${tagId}/${state}`)
    .then((res: { data: any }) => res?.data);
};

export const useChangeTagState = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: changeTagState,
    onSuccess(response) {
      handleSuccess(response);
    },
    onError(error) {
      handleError(error);
    },
  });
};

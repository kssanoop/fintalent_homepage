import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const updateView = async (candidateId: string) => {
  return await axios.post(`/candidate/profile/view/${candidateId}`);
};

export const useUpdateView = () => {
  return useMutation({
    mutationFn: updateView,
  });
};

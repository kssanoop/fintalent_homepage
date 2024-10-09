import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getAllPendingCandidatesAdmin = async () => {
  return await axios.get(`/candidate//admin/pending`).then((res) => res.data);
};

export const useGetAllPendingCandidatesAdmin = () => {
  return useQuery({
    queryFn: async () => await getAllPendingCandidatesAdmin(),
    queryKey: ["pending-candidates-admin"],
  });
};

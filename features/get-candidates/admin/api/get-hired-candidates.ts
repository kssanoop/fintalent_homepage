import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getHiredCandidatesAdmin = async () => {
  return await axios.get(`/candidate/admin/hired`).then((res) => res.data);
};

export const useGetHiredCandidatesAdmin = () => {
  return useQuery({
    queryFn: async () => await getHiredCandidatesAdmin(),
    queryKey: ["hired-candidates-admin"],
  });
};

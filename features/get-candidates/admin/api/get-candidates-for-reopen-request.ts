import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCandidatesForReopenRequest = async () => {
  return await axios
    .get("/candidate/admin/reopen-requests")
    .then((res) => res.data);
};

export const useGetCandidatesForReopenRequest = () => {
  return useQuery({
    queryFn: async () => await getCandidatesForReopenRequest(),
    queryKey: ["candidates-for-reopen-request"],
  });
};

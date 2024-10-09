import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCandidateInfo = async () => {
  return await axios.get("/candidate/profile").then((res) => res.data);
};

export const useFetchCandidateInfo = (onSuccess?: any, onError?: any) =>
  useQuery({
    queryKey: ["candidate"],
    queryFn: async () => await getCandidateInfo(),
    onSuccess,
    onError,
  });

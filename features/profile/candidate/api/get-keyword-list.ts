import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getKeywordLists = async () => {
  return await axios
    .get(`/candidate/dashboard/keywords`)
    .then((res) => res.data);
};

export const useGetKeywordLists = () => {
  return useQuery({
    queryFn: async () => await getKeywordLists(),
    queryKey: ["get-keyword-lists"],
  });
};

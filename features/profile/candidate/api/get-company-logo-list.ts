import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCompanyLists = async () => {
  return await axios
    .get(`/candidate/dashboard/profile-view-company-list`)
    .then((res) => res.data);
};

export const useGetCompanyLists = () => {
  return useQuery({
    queryFn: async () => await getCompanyLists(),
    queryKey: ["get-company-lists"],
  });
};

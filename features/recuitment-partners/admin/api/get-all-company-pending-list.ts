import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getAllCompaniesListPending = async () => {
  return await axios
    .get(`recruiter/company/all-pending`)
    .then((res) => res.data);
};

export const useGetAllCompanyListPending = () => {
  return useQuery({
    queryFn: async () => await getAllCompaniesListPending(),
    queryKey: ["all-company-list-pending"],
  });
};

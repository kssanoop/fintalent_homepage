import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCompanyById = async (companyId: string | undefined) => {
  return await axios
    .get(`/recruiter/company/by-id/${companyId}`)
    .then((res) => res.data);
};

export const useGetCompanyById = (companyId: string | undefined) => {
  return useQuery({
    queryKey: ["company-by-id", companyId],
    queryFn: async () => await getCompanyById(companyId),
    refetchOnWindowFocus: false,
  });
};

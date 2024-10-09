import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCompaniesAllActiveRecruiter = async (companyid: any) => {
  console.log("usehook:", companyid);
  const { companyId } = companyid || {};
  return await axios
    .get(`/recruiter/profile/company/active-recruiters/${companyId}`)
    .then((res) => res.data);
};

export const useGetCompaniesAllActiveRecruiter = (companyId: any) => {
  return useQuery({
    queryFn: async () => await getCompaniesAllActiveRecruiter(companyId),
    queryKey: ["get-companies-all-active-recruiter", companyId],
  });
};

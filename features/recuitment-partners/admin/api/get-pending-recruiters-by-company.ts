import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCompaniesAllPendingRecruiter = async (companyid: any) => {
  console.log("usehook:", companyid);
  const { companyId } = companyid || {};
  return await axios
    .get(`/recruiter/profile/company/pending-recruiters/${companyId}`)
    .then((res) => res.data);
};

export const useGetCompaniesAllPendingRecruiter = (companyId: any) => {
  return useQuery({
    queryFn: async () => await getCompaniesAllPendingRecruiter(companyId),
    queryKey: ["get-companies-all-pending-recruiter", companyId],
  });
};

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";

const getCompaniesForBilling = async (
  filters?: any,
): Promise<
  Array<
    CompanyDataType & {
      recruiters: number;
      jobPosted: number;
      candidateViews: number;
      billAmount: number;
    }
  >
> => {
  const response = await axios({
    url: "/billing/admin/companies",
    method: "POST",
    data: { ...filters },
  });
  return response.data;
};

function useGetCompaniesForBilling({ filters }: { filters: any }) {
  return useQuery({
    queryKey: ["companies-for-billing", filters],
    queryFn: async () => await getCompaniesForBilling(filters),
  });
}

export default useGetCompaniesForBilling;

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";

const getCompaniesForAdminUnderManager = async (
  managerId: string,
  filters?: any,
): Promise<CompanyDataType[]> => {
  const response = await axios({
    url: `/admin/manager/companies/${managerId}`,
    method: "POST",
    data: filters || {},
  });
  console.log(response);
  return response.data;
};

function useGetCompaniesForAdminUnderManager(managerId: string, filters?: any) {
  console.log(filters);
  return useQuery({
    queryKey: [
      "recruitment-companies-for-admin-under-manager",
      filters,
      managerId,
    ],
    queryFn: async () =>
      await getCompaniesForAdminUnderManager(managerId, filters),
  });
}

export default useGetCompaniesForAdminUnderManager;

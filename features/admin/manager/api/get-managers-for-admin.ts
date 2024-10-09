import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ManagerFilterForAdmin } from "../type/manager-filter-for admin";
import { ManagerInfoWithRole } from "../type/manager-info";

const getManagersForAdmin = async (
  filters?: ManagerFilterForAdmin,
): Promise<ManagerInfoWithRole[]> => {
  const response = await axios({
    url: "/admin/manager/filter?page=1&limit=100",
    method: "POST",
    data: filters || {},
  });
  return response.data;
};

function useGetManagersForAdmin(filters?: ManagerFilterForAdmin) {
  return useQuery({
    queryKey: ["managers-for-admin", filters],
    queryFn: async () => await getManagersForAdmin(filters),
  });
}

export default useGetManagersForAdmin;

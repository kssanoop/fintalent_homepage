import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getRoleAdminDashboard = async () => {
  return await axios
    .get(`/admin/dashboard/role-numbers`)
    .then((res) => res.data);
};

export const useGetInfoFromCookieAdminDashboard = () => {
  return useQuery({
    queryFn: async () => await getRoleAdminDashboard(),
    queryKey: ["admin-dashboard-roles"],
  });
};

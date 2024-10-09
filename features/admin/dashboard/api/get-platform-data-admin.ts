import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getPlatformDataAdminDashboard = async () => {
  return await axios.get(`/admin/dashboard/platform-data`);
};

export const useGetPlatformDataAdminDashboard = () => {
  return useQuery({
    queryFn: async () => await getPlatformDataAdminDashboard(),
    queryKey: ["admin-dashboard-roles"],
  });
};

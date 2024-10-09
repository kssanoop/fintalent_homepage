import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getLoginCount = async () => {
  return await axios
    .get("/admin/dashboard/role-login-numbers")
    .then((res) => res.data);
};

export const useGetLoginCount = () => {
  return useQuery({
    queryFn: async () => await getLoginCount(),
    queryKey: ["admin-dashboard-login"],
  });
};

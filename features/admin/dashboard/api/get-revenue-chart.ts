import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getRevenueChart = async (): Promise<
  Array<{
    month: number;
    totalAmount: number;
  }>
> => {
  return await axios
    .get("/admin/dashboard/revenue-graph")
    .then((res) => res.data);
};

export const useGetRevenueChart = () => {
  return useQuery({
    queryFn: async () => await getRevenueChart(),
    queryKey: ["admin-dashboard-revenue-chart"],
  });
};

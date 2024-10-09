import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getCTCCount = async () => {
  return await axios.get("/admin/dashboard/ctc-graph").then((res) => res.data);
};

export const useGetCTCCount = () => {
  return useQuery({
    queryFn: async () => await getCTCCount(),
    queryKey: ["admin-dashboard-ctc"],
  });
};

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getSignupHired = async () => {
  return await axios
    .get("/admin/dashboard/candidate-graph")
    .then((res) => res.data);
};

export const useGetSignupHired = () => {
  return useQuery({
    queryFn: async () => await getSignupHired(),
    queryKey: ["admin-dashboard-signup"],
  });
};

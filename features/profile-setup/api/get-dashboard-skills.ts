import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getDashboardskill = async () => {
  return await axios.get(`/recruiter/dashboard/skills`).then((res) => res.data);
};

export const useGetDashboardskill = () => {
  return useQuery({
    queryFn: getDashboardskill,
    queryKey: ["get-recruiter-dashboard-skills"],
  });
};

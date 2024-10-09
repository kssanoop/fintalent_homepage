import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getDashboardQualification = async () => {
  return await axios
    .get(`/recruiter/dashboard/qualification`)
    .then((res) => res.data);
};

export const useGetDashboardQualification = () => {
  return useQuery({
    queryFn: getDashboardQualification,
    queryKey: ["get-recruiter-dashboard-qualifications"],
  });
};

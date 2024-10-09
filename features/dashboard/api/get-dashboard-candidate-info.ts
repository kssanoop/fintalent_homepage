import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
import { DashboardCandidateInfo } from "../types/dashboard-candidate-info";

const getDashboardCandidateInfo = async ({
  role,
}: {
  role: RoleTypes;
}): Promise<DashboardCandidateInfo> => {
  const response = await axios({
    url: `/${role}/dashboard/role-numbers`,
    method: "GET",
  });

  //   @ts-ignore
  return response.formatedData;
};

function useGetDashboardCandidateInfo({
  role = "manager",
}: {
  role?: RoleTypes;
}) {
  return useQuery({
    queryKey: ["dashboard-candidate-info", role],
    queryFn: async () => await getDashboardCandidateInfo({ role }),
  });
}

export default useGetDashboardCandidateInfo;

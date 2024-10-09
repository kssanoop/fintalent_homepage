import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
import { DashboardCandidateInfo } from "@/features/dashboard/types/dashboard-candidate-info";

const getDashboardCandidateInfo = async ({
  role,
}: {
  role: RoleTypes;
}): Promise<DashboardCandidateInfo> => {
  const response = await axios({
    url: `/${role}/dashboard/candidate-numbers`,
    method: "GET",
  });

  //   @ts-ignore
  return response.formatedData;
};

function useGetDashboardCandidateInfoTL({
  role = "teamlead",
}: {
  role?: RoleTypes;
}) {
  return useQuery({
    queryKey: ["dashboard-candidate-info-TL", role],
    queryFn: async () => await getDashboardCandidateInfo({ role }),
  });
}

export default useGetDashboardCandidateInfoTL;

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { TeamLeadInfo } from "../type/team-lead-info";

const getTeamLeadsForAdminUnderManager = async (
  managerId: string,
  filters?: any,
): Promise<TeamLeadInfo[]> => {
  const response = await axios({
    url: `/admin/teamlead/under-manager/${managerId}`,
    method: "POST",
    data: filters || {},
  });
  console.log(response);
  return response.data;
};

function useGetTeamLeadsForAdminUnderManager(managerId: string, filters?: any) {
  console.log(filters);
  return useQuery({
    queryKey: ["team-leads-for-admin-under-manager", filters, managerId],
    queryFn: async () =>
      await getTeamLeadsForAdminUnderManager(managerId, filters),
  });
}

export default useGetTeamLeadsForAdminUnderManager;

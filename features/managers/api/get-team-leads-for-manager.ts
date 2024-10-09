import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";

export const getTeamLeadsForManager = async (
  filters?: any,
): Promise<TeamLeadInfo[]> => {
  const response = await axios({
    url: `/manager/teamlead/under-manager`,
    method: "POST",
    data: filters || {},
  });
  console.log(response);
  return response.data;
};

function useGetTeamLeadsForManager(filters?: any, enabled: boolean = true) {
  console.log(filters);
  return useQuery({
    queryKey: ["team-leads-for-manager", filters],
    queryFn: async () => await getTeamLeadsForManager(filters),
    enabled,
  });
}

export default useGetTeamLeadsForManager;

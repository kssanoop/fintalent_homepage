import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { TeamLeadInfo } from "../../manager/type/team-lead-info";
import { useAuthorization } from "@/utils/hooks/useAuthorization";
import { getTeamLeadsForManager } from "@/features/managers/api/get-team-leads-for-manager";

const getTeamLeadsForAdmin = async (filters?: any): Promise<TeamLeadInfo[]> => {
  const response = await axios({
    url: `/admin/teamlead/filter`,
    method: "POST",
    data: filters || {},
  });
  return response.data;
};

function useGetTeamLeadsForAdmin(filters?: any, enabled: boolean = true) {
  const { role } = useAuthorization();
  return useQuery({
    queryKey: ["team-leads-for-admin", filters, role],
    queryFn: async () => {
      // Note: quick fix, need to refactor
      if (role === "manager") {
        return await getTeamLeadsForManager(filters);
      }
      return await getTeamLeadsForAdmin(filters);
    },
    enabled,
  });
}

export default useGetTeamLeadsForAdmin;

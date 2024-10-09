import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
import { TeamLeadWins } from "../types/team-lead-wins";
import { Filter } from "./get-revenue-number";

const getTeamLeadWins = async ({
  role,
  filter,
}: {
  role: RoleTypes;
  filter: Filter;
}): Promise<TeamLeadWins> => {
  const response = await axios({
    url: `/${role}/dashboard/teamlead-win-list?range=${filter}`,
    method: "GET",
  });

  return response.data;
};

function useGetTeamLeadWins({
  role = "manager",
  filter = "allTime",
}: {
  role?: RoleTypes;
  filter?: Filter;
}) {
  return useQuery({
    queryKey: ["team-lead-wins", role, filter],
    queryFn: async () => await getTeamLeadWins({ role, filter }),
  });
}

export default useGetTeamLeadWins;

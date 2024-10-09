import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
import { CandidateInfoDashboard } from "@/components/team-lead/dashboard/team-lead-body/team-leads-list";
import { Filter } from "@/features/dashboard/api/get-revenue-number";

const getCandidateWins = async ({
  role,
  filter,
}: {
  role: RoleTypes;
  filter: Filter;
}): Promise<CandidateInfoDashboard> => {
  const response = await axios({
    url: `/${role}/dashboard/candidate-win-list?range=${filter}`,
    method: "GET",
  });

  return response.data;
};

function useGetCandidateWins({
  role = "teamlead",
  filter = "allTime",
}: {
  role?: RoleTypes;
  filter?: Filter;
}) {
  return useQuery({
    queryKey: ["team-lead-candidate-wins", role, filter],
    queryFn: async () => await getCandidateWins({ role, filter }),
  });
}

export default useGetCandidateWins;

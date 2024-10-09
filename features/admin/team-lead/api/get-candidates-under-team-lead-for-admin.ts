import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { GetUnhiredCandidatesSchema } from "@/features/get-candidates/schema/get-unhired-candidates-schema";

const getCandidatesUnderTeamLeadForAdmin = async (
  teamLeadId: string,
  filters?: any,
): Promise<GetUnhiredCandidatesSchema> => {
  console.log(teamLeadId);
  const response = await axios({
    url: `/candidate/admin/under-teamLead/${teamLeadId}`,
    method: "POST",
    data: { ...filters },
  });
  // TODO: fix type error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return response;
};

function useGetCandidatesUnderTeamLeadForAdmin(arg: { teamLeadId: string }) {
  const { teamLeadId, ...filters } = arg;

  console.log(filters);
  return useQuery({
    queryKey: ["unhired-candidates", teamLeadId, filters],
    queryFn: async () =>
      await getCandidatesUnderTeamLeadForAdmin(teamLeadId, filters),
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export default useGetCandidatesUnderTeamLeadForAdmin;

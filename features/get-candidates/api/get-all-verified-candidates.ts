import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { GetUnhiredCandidatesSchema } from "../schema/get-unhired-candidates-schema";
import { RoleTypes } from "@/types/authorization";

const getAllVerifiedCandidates = async (
  query: string,
  teamLeadId: string,
  filters?: any,
  role?: RoleTypes,
): Promise<GetUnhiredCandidatesSchema> => {
  const response = await axios({
    url: `/candidate/admin/verified`,
    method: "POST",
    data: { search: query, teamLeadId: teamLeadId || undefined, ...filters },
  });
  // TODO: fix type error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return response;
};

function useGetAllVerifiedCandidate(arg: {
  search: string;
  teamLeadId?: string;
  enabled?: boolean;
  role?: RoleTypes;
}) {
  const { search, teamLeadId = "", enabled, role = "admin", ...filters } = arg;

  return useQuery({
    queryKey: ["verified-candidates", search, filters, role, teamLeadId],
    queryFn: async () =>
      await getAllVerifiedCandidates(search, teamLeadId, filters, role),
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export default useGetAllVerifiedCandidate;

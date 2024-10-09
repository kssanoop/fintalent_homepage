import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { GetUnhiredCandidatesSchema } from "../../schema/get-unhired-candidates-schema";
const getUnhiredCandidatesAdmin = async (
  query: string,
  jobId?: string,
  tagId?: string,
  filters?: any,
): Promise<GetUnhiredCandidatesSchema> => {
  console.log(jobId);
  const response = await axios({
    url: "/candidate/admin/unhired",
    method: "POST",
    data: { search: query, jobId, tagId, ...filters },
  });
  // TODO: fix type error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return response;
};

function useGetUnhiredCandidatesAdmin(arg: {
  search: string;
  enabled?: boolean;
  jobId?: string;
  tagId?: string;
}) {
  const { search, enabled, jobId, tagId, ...filters } = arg;

  return useQuery({
    queryKey: ["unhired-candidates", search, jobId, tagId, filters],
    queryFn: async () =>
      await getUnhiredCandidatesAdmin(search, jobId, tagId, filters),
    enabled,
    refetchOnWindowFocus: false,
  });
}

export default useGetUnhiredCandidatesAdmin;

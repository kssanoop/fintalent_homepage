import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { getNextPageParamForPagination } from "@/utils/getNextPageParamForPagination";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { CandidateSchema } from "../schema/candidate-schema";

const getUnhiredCandidates = async (
  query: string,
  pageParam: number = 1,
  jobId?: string,
  filters?: any,
): Promise<ResponseWithPagination<CandidateSchema[]>> => {
  console.log(jobId);
  const response = await axios({
    url: `/candidate/profile/unhired?page=${pageParam}&limit=10`,
    method: "POST",
    data: { search: query, jobId, ...filters },
  });

  return response as unknown as ResponseWithPagination<CandidateSchema[]>;
};

function useGetUnhiredCandidates(arg: {
  search: string;
  enabled?: boolean;
  jobId?: string;
}) {
  const { search, enabled, jobId, ...filters } = arg;

  return useInfiniteQuery({
    queryKey: ["unhired-candidates", search, jobId, filters],
    queryFn: async ({ pageParam = 1 }) =>
      await getUnhiredCandidates(search, pageParam, jobId, filters),
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
    getNextPageParam: getNextPageParamForPagination,
  });
}

export default useGetUnhiredCandidates;

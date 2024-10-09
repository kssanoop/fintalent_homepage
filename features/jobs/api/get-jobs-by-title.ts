import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { AllJobsSchema } from "../schema/all-jobs-schema";
import { RoleTypes } from "@/types/authorization";
import { ResponseWithPagination } from "@/types/response-with-pagination";

const getJobs = async (
  query: string,
  candidateId: string,
  filters?: any,
  role: RoleTypes = "recruiter",
  pageParam: number = 1,
): Promise<ResponseWithPagination<AllJobsSchema>> => {
  const response = await axios({
    url: `/job/${role}/query?page=${pageParam}&limit=10`,
    method: "POST",
    data: { search: query, candidateId: candidateId || undefined, ...filters },
  });

  return response as unknown as ResponseWithPagination<AllJobsSchema>;
};

function useGetJobsByTitle(arg: {
  search: string;
  candidateId?: string;
  role?: RoleTypes;
}) {
  const { search, role, candidateId = "", ...filters } = arg;
  return useInfiniteQuery({
    queryKey: ["all-jobs", search, filters, role, candidateId],
    queryFn: async ({ pageParam = 1 }) =>
      await getJobs(search, candidateId, filters, role, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length ? allPages.length + 1 : undefined,
    refetchOnWindowFocus: false,
  });
}

export default useGetJobsByTitle;

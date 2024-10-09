import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Job } from "../../schema/all-jobs-schema";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { getNextPageParamForPagination } from "@/utils/getNextPageParamForPagination";

const getJobs = async (
  query: string,
  pageParam: number = 1,
): Promise<ResponseWithPagination<Job[]>> => {
  const response = await axios({
    url: `/job/manager/query?page=${pageParam}&limit=10`,
    method: "POST",
    data: { search: query },
  });
  return response as unknown as ResponseWithPagination<Job[]>;
};

function useGetJobsForManager(arg: { search: string }) {
  const { search } = arg;
  return useInfiniteQuery({
    queryKey: ["all-jobs-for-manager", search],
    queryFn: async ({ pageParam = 1 }) => await getJobs(search, pageParam),
    getNextPageParam: getNextPageParamForPagination<Job[]>,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export default useGetJobsForManager;

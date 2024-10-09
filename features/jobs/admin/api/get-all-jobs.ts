import { axios } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AllJobsSchema } from "../../schema/all-jobs-schema";
import { getNextPageParamForPagination } from "@/utils/getNextPageParamForPagination";
import { ResponseWithPagination } from "@/types/response-with-pagination";

const getAllJobsAdmin = async (
  pageParam = 1,
): Promise<ResponseWithPagination<AllJobsSchema>> => {
  return await axios
    .post(`/job/admin/query?page=${pageParam}&limit=10`)
    .then((res) => res as unknown as ResponseWithPagination<AllJobsSchema>);
};

export const useGetAllJobsAdmin = () => {
  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => await getAllJobsAdmin(pageParam),
    queryKey: ["get-all-job-admin-dashboard"],
    getNextPageParam: getNextPageParamForPagination,
  });
};

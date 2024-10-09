import { RoleTypes } from "@/types/authorization";
import { axios } from "@/lib/axios";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { getNextPageParamForPagination } from "@/utils/getNextPageParamForPagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { JobApplicationSchema } from "../../schema/job-application-schema";

export const getCandidatesByJobIdAndStages = async ({
  jobId,
  stage,
  role,
  pageParam,
}: {
  jobId: string;
  stage: string;
  role: RoleTypes;
  pageParam: string;
}): Promise<ResponseWithPagination<JobApplicationSchema[]>> => {
  return await axios
    .get(
      `/job/${role}/applications/${jobId}/${
        stage || "invited"
      }?page=${pageParam}&limit=10`,
    )
    .then(
      (res) => res as unknown as ResponseWithPagination<JobApplicationSchema[]>,
    );
};

export const useGetCandidatesByJobIdAndStages = ({
  jobId,
  stage,
  role = "admin",
}: {
  jobId: string;
  stage: string;
  role?: RoleTypes;
}) => {
  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) =>
      await getCandidatesByJobIdAndStages({ jobId, stage, role, pageParam }),
    getNextPageParam: getNextPageParamForPagination,
    queryKey: ["get-candidates-by-jobId", jobId, stage, role],
  });
};

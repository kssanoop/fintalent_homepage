import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { JobApplicationSchema } from "../schema/job-application-schema";
import { Stage } from "../type/stage";
import { ResponseWithPagination } from "@/types/response-with-pagination";

export type DataProps = {
  stage: Stage;
  jobId: string;
};

const getJobApplicationByRecruiter = async (
  data: DataProps,
  pageParam: number = 1,
): Promise<ResponseWithPagination<JobApplicationSchema[]>> => {
  const { jobId, stage } = data;
  const response = await axios.get(
    `/job/application/${jobId}/${
      stage || "invited"
    }?page=${pageParam}&limit=10`,
  );
  return response as unknown as ResponseWithPagination<JobApplicationSchema[]>;
};

function useGetJobApplicationByRecruiter(data: DataProps) {
  return useInfiniteQuery({
    queryKey: ["job-application-by-recruiter", data],
    queryFn: async ({ pageParam = 1 }) =>
      await getJobApplicationByRecruiter(data, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length ? allPages.length + 1 : undefined,
    refetchOnWindowFocus: false,
  });
}

export default useGetJobApplicationByRecruiter;

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Job } from "../schema/all-jobs-schema";

export const getJobById = async (jobId: string): Promise<Job> => {
  const response = await axios.get(`/job/application/job/${jobId}`);
  return response.data;
};

export const useGetJobById = (jobId: string) => {
  return useQuery({
    queryFn: async () => await getJobById(jobId),
    queryKey: ["job-by-id", jobId],
  });
};

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

export const getJobApplicationById = async (jobId: string) => {
  return await axios.get(`/job/application/${jobId}/all`);
};

function useGetJobApplicationById(jobId: string) {
  return useQuery({
    queryKey: ["job-application-by-Id", jobId],
    queryFn: async () => await getJobApplicationById(jobId),
    refetchOnWindowFocus: false,
  });
}

export default useGetJobApplicationById;

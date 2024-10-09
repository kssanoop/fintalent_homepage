import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { JobApplicationSchema } from "../schema/job-application-schema";
import { Stage } from "../type/stage";

const getJobApplicationByCandidate = async (
  stage: Stage,
): Promise<JobApplicationSchema[]> => {
  const response = await axios.get(`/job/application/candidate/${stage}`);
  return response.data;
};

function useGetJobApplicationByCandidate({ stage }: { stage: Stage }) {
  return useQuery({
    queryKey: ["job-application-by-candidate", stage],
    queryFn: async () => await getJobApplicationByCandidate(stage),
  });
}

export default useGetJobApplicationByCandidate;

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCandidatesByJobIdAndStages = async ({
  jobId,
  stage,
}: {
  jobId: string;
  stage: string;
}) => {
  return await axios
    .get(
      `/job/manager/applications/${jobId}/${
        stage || "invited"
      }?page=1&limit=20`,
    )
    .then((res) => res.data);
};

export const useGetCandidatesByStagesForManager = ({
  jobId,
  stage,
}: {
  jobId: string;
  stage: string;
}) => {
  return useQuery({
    queryFn: async () => await getCandidatesByJobIdAndStages({ jobId, stage }),
    queryKey: ["get-candidates-by-jobId", jobId, stage],
  });
};

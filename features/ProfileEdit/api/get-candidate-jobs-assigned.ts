import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface getJobAssignedCandidateProps {
  candidateId: string;
}

const getJobAssignedCandidate = async ({
  candidateId,
}: getJobAssignedCandidateProps) => {
  return await axios
    .get(`/job/application/candidate/${candidateId}/all`)
    .then((res) => res.data);
};

export const useGetJobAssignedCandidate = ({
  candidateId,
}: getJobAssignedCandidateProps) => {
  return useQuery({
    queryFn: async () => await getJobAssignedCandidate({ candidateId }),
    queryKey: ["get-jobs-assigned", candidateId],
  });
};

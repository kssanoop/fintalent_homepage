import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";

const inviteMultipleCanidatesToMultipleJobs = async (data: {
  query: CandidateFilters & {
    search: string;
  };
  jobIds: string[];
}) => {
  return await axios({
    url: "/job/application/create-multiple-query-jobIds",
    method: "POST",
    data,
  });
};

const useInviteMultipleCandidatesToMultipleJobs = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: inviteMultipleCanidatesToMultipleJobs,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useInviteMultipleCandidatesToMultipleJobs;

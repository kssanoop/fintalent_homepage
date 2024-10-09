import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const inviteMutipleCandidateToMultipleJobs = async (data: {
  tagId: string;
  jobIds: string[];
  query: CandidateFilters & {
    search: string;
  };
}) => {
  return await axios({
    url: "/job/application/create-multiple-query-jobIds-tagid",
    method: "POST",
    data,
  });
};

export const useInviteMutipleCandidateToMultipleJobs = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: inviteMutipleCandidateToMultipleJobs,
    onSuccess: (response) => {
      console.log(
        "response from invite multiple candidates to Jobs ",
        response,
      );
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useInviteMutipleCandidateToMultipleJobs;

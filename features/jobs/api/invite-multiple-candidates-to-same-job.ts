import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const inviteCanidateToMultipleJob = async (data: {
  candidateId: string;
  jobIds: string[];
}) => {
  return await axios({
    url: "/job/application/create-multiple-jobIds",
    method: "POST",
    data,
  });
};

export const useInviteCandidateToMultipleJob = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: inviteCanidateToMultipleJob,
    onSuccess: (response) => {
      console.log("response from invite multiple to job ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useInviteCandidateToMultipleJob;

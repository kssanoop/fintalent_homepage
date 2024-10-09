import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const inviteToJob = async ({
  jobId,
  candidateId,
}: {
  jobId: string;
  candidateId: string;
}) => {
  return await axios({
    url: `/job/application/${jobId}/${candidateId}`,
    method: "POST",
  });
};

export const useInviteToJob = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: inviteToJob,
    onSuccess: (response) => {
      console.log("response from add job ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useInviteToJob;

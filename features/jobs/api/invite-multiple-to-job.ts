import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const inviteMultipleToJob = async (data: {
  jobId: string;
  salaryBegin?: number;
  search: string;
  employmentMode?: string[];
  skills?: string[];
  gender?: string;
}) => {
  return await axios({
    url: "/job/application/create-multiple",
    method: "POST",
    data,
  });
};

export const useInviteMultipleToJob = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: inviteMultipleToJob,
    onSuccess: (response) => {
      console.log("response from invite multiple to job ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useInviteMultipleToJob;

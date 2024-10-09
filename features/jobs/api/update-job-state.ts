import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { JobStatus } from "../type/job-status";

const updateJobState = async ({
  jobId,
  jobStatus: state,
}: {
  jobId: string;
  jobStatus: JobStatus;
}) => {
  return await axios({
    url: `/job/recruiter/${jobId}/status?state=${state}`,
    method: "PUT",
  });
};

export const useUpdateJobState = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: updateJobState,
    onSuccess: (response) => {
      console.log("response from edit job state", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useUpdateJobState;

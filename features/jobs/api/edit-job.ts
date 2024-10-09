import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { JobSchema } from "../schema/add-and-edit-job-schema";

export type EditJobType = {
  data: JobSchema;
  jobId: string;
};

const editJob = async ({ data, jobId }: EditJobType) => {
  return await axios({
    url: `/job/recruiter/${jobId}`,
    method: "PUT",
    data,
  });
};

export const useEditJob = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: editJob,
    onSuccess: (response) => {
      console.log("response from edit job ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useEditJob;

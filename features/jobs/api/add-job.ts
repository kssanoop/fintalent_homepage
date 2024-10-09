import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { JobSchema } from "../schema/add-and-edit-job-schema";

const addJob = async (data: JobSchema) => {
  return await axios({
    url: "/job/recruiter",
    method: "POST",
    data,
  });
};

export const useAddJob = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: addJob,
    onSuccess: (response) => {
      console.log("response from add job ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useAddJob;

import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const deleteInterviewByRecruiter = async (interviewId: string) => {
  return await axios({
    url: `/interview/recruiter/interviews/${interviewId}`,
    method: "DELETE",
  });
};

export const useDeleteInterviewByrecruiter = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: deleteInterviewByRecruiter,
    onSuccess: (response: any) => {
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useDeleteInterviewByrecruiter;

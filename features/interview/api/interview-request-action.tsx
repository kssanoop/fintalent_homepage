import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const interviewRequestAction = async (
  interviewId: string,
  action: string,
) => {
  return await axios.post(
    `/interview/candidate/interviews/${interviewId}/${action}`,
  );
};

export const useInterviewRequestAction = (
  handleSuccess: any,
  handleError: any,
  interviewId: string,
  action: string,
) => {
  return useMutation({
    mutationFn: async () => await interviewRequestAction(interviewId, action),
    mutationKey: ["interview-request-action"],
    onSuccess: (data) => {
      handleSuccess(data);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

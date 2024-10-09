import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type InterviewScheduleSchema = {
  startDateTime: string;
  interviewUrl: string;
};

export type ScheduleInterviewType = {
  data: InterviewScheduleSchema;
  jobApplicationId: string;
};

const scheduleInterview = async ({
  data,
  jobApplicationId,
}: ScheduleInterviewType) => {
  return await axios({
    url: `/job/application/schedule-interview/${jobApplicationId}`,
    method: "POST",
    data,
  });
};

export const useScheduleInterview = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: scheduleInterview,
    onSuccess: (response: any) => {
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useScheduleInterview;

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getJobQuestions = async (jobId: string) => {
  return await axios
    .get(`/job/question/${jobId}`)
    .then((resposne) => resposne.data);
};

export const useGetJobQuestions = (jobId: string) => {
  return useQuery({
    queryFn: async () => await getJobQuestions(jobId),
    queryKey: ["getJobQuestionById", jobId],
  });
};

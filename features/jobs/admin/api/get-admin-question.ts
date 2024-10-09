import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getAdminQuestions = async (): Promise<any> => {
  return await axios.get(`/misc/questions`).then((res) => res.data);
};

export const useGetAdminQuestions = () => {
  return useQuery({
    queryFn: async () => await getAdminQuestions(),
    queryKey: ["get-all-job-questions"],
  });
};

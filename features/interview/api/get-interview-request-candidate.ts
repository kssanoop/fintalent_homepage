import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getInterviewRequests = async () => {
  return await axios
    .get("/interview/candidate/interviews/pending")
    .then((res) => res.data);
};

export const useGetInterviewRequests = () => {
  return useQuery({
    queryFn: async () => await getInterviewRequests(),
    queryKey: ["get-interview-requests"],
  });
};

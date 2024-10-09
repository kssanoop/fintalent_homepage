import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getInterviewUpcomingCandidate = async () => {
  return await axios
    .get("/interview/candidate/interviews/active")
    .then((res) => res.data);
};

export const useGetInterviewUpcomingCandidate = () => {
  return useQuery({
    queryFn: async () => await getInterviewUpcomingCandidate(),
    queryKey: ["get-interview-upcoming"],
  });
};

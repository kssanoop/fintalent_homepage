import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getJobInvitesByCandidate = async () =>
  await axios.get("/job/application/candidate/invited").then((res) => res.data);

export const useGetJobInvitesByCandidate = (onSuccess: any, onError: any) =>
  useQuery({
    queryKey: ["getCandidateJobs"],
    queryFn: async () => await getJobInvitesByCandidate(),
    onSuccess,
    onError,
  });

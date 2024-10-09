import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const getCandidateProfileStatus = async () => {
  const response = await axios.get("/candidate/dashboard/profile-status");
  return response.data;
};

function useGetCandidateProfileStatus() {
  return useQuery({
    queryKey: ["profile-status"],
    queryFn: getCandidateProfileStatus,
  });
}

export default useGetCandidateProfileStatus;

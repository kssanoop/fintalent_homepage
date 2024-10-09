import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { CandidateProfileSchema } from "../schema/candidate-profile-schema";

const getCandidateProfile = async (): Promise<
  CandidateProfileSchema["data"]
> => {
  const response = await axios.get("/candidate/profile");
  return response.data;
};

function useGetCandidateProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getCandidateProfile,
  });
}

export default useGetCandidateProfile;

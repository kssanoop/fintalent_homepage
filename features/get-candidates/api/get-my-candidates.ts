import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { GetUnhiredCandidatesSchema as CandidateSchema } from "../schema/get-unhired-candidates-schema";

const getMyCandidates = async (): Promise<CandidateSchema["data"]> => {
  const response = await axios.get("/candidate/profile/hired/thisCompany");
  return response.data;
};

function useGetMyCandidates() {
  return useQuery({
    queryKey: ["my-candidates"],
    queryFn: getMyCandidates,
  });
}

export default useGetMyCandidates;

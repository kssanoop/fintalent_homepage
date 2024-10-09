import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { GetUnhiredCandidatesSchema as CandidateSchema } from "../schema/get-unhired-candidates-schema";

const getHiredCandidates = async (): Promise<CandidateSchema["data"]> => {
  const response = await axios.get("/candidate/profile/hired/all");
  return response.data;
};

function useGetHiredCandidates() {
  return useQuery({
    queryKey: ["hired-candidates"],
    queryFn: getHiredCandidates,
    refetchOnWindowFocus: false,
  });
}

export default useGetHiredCandidates;

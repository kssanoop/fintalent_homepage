import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { CandidateSchema } from "../schema/candidate-schema";

const getAllCandidates = async (): Promise<CandidateSchema[]> => {
  const response = await axios({
    url: "/candidate/profile",
    method: "GET",
  });

  return response.data;
};

function useGetAllCandidates() {
  return useQuery({
    queryKey: ["all-candidates"],
    queryFn: getAllCandidates,
  });
}

export default useGetAllCandidates;

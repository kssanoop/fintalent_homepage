import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const getAllCandidateCountsAdmin = async () => {
  const response = await axios({
    url: "/candidate/admin/unhired",
    method: "POST",
  });
  return response.data;
};

function useGetAllCandidateCountsAdmin() {
  return useQuery({
    queryKey: ["unhired-candidates-count"],
    queryFn: async () => await getAllCandidateCountsAdmin(),
    refetchOnWindowFocus: false,
  });
}

export default useGetAllCandidateCountsAdmin;

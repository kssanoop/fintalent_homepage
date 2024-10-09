import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const fetchSkills = async () => {
  const response = await axios.get("/misc/skills");
  return response.data;
};

function useGetSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    refetchOnWindowFocus: false,
  });
}

export default useGetSkills;

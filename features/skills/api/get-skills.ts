import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getSkills = async (): Promise<string[]> => {
  const response = await axios.get("/misc/skills");
  return response.data;
};

export const useGetSkills = () => {
  return useQuery({
    queryFn: async () => await getSkills(),
    queryKey: ["skills"],
  });
};

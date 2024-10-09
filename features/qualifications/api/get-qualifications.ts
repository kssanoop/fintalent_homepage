import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getQualifications = async (): Promise<string[]> => {
  const response = await axios.get("/misc/qualifications");
  return response.data;
};

export const useGetQualifications = () => {
  return useQuery({
    queryFn: async () => await getQualifications(),
    queryKey: ["qualifications"],
  });
};

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type ViewCost = {
  unverifiedViewCost: string;
  verifiedViewCost: string;
};

export const getViewCost = async (): Promise<ViewCost> => {
  const response = await axios({
    method: "GET",
    url: "/misc/viewcost",
  });
  return response.data;
};

export const useGetViewCost = () => {
  return useQuery({
    queryKey: ["view-cost"],
    queryFn: async () => await getViewCost(),
  });
};

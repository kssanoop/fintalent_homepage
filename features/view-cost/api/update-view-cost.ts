import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ViewCost } from "./get-view-cost";
import { toast } from "sonner";

export type TrustScore = {
  trustScore: string;
};

export const updateViewCost = async (data: ViewCost) => {
  return await axios.put("/misc/viewcost", {
    ...data,
  });
};

export const useUpdateViewCost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateViewCost,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["view-cost"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

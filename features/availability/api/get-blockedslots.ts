import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { BlockedSlot } from "../schema/blocked-slots-schema";

const getBlockedSlots = async (): Promise<BlockedSlot[]> => {
  const response = await axios.get("/interview/candidate/blocker");
  return response.data;
};

function useGetBlockedSlots() {
  return useQuery({
    queryKey: ["blocked-slots"],
    queryFn: getBlockedSlots,
  });
}

export default useGetBlockedSlots;

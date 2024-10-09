import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const getTimeSlots = async (date: string): Promise<string[]> => {
  const response = await axios.request({
    method: "POST",
    url: "/interview/candidate/getSlots",
    data: {
      date,
    },
  });
  return response.data;
};

function useGetTimeSlots(date: string) {
  return useQuery({
    queryKey: ["time-slots", date],
    queryFn: async () => await getTimeSlots(date),
    enabled: !!date,
  });
}

export default useGetTimeSlots;

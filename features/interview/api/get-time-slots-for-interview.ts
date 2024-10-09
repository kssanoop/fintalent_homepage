import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const getTimeSlots = async (data: {
  date: string;
  candidateId: string;
}): Promise<string[]> => {
  const response = await axios.request({
    method: "POST",
    url: `/interview/recruiter/getSlots/${data.candidateId}`,
    data: {
      date: data.date,
    },
  });
  return response.data;
};

function useGetTimeSlotsForInterview(data: {
  date: string;
  candidateId: string;
}) {
  return useQuery({
    queryKey: ["time-slots-for-interview", data],
    queryFn: async () => await getTimeSlots(data),
    enabled: !!data.date,
  });
}

export default useGetTimeSlotsForInterview;

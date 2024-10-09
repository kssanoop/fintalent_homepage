import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { NotificationsCount } from "../type/notification-count";

const getNotificationsCount = async (): Promise<NotificationsCount> => {
  const response = await axios({
    url: "/notification/count",
    method: "GET",
  });

  return response.data;
};

function useGetNotificationsCount() {
  return useQuery({
    queryKey: ["notifications-count"],
    queryFn: async () => await getNotificationsCount(),
  });
}

export default useGetNotificationsCount;

import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { getNextPageParamForPagination } from "@/utils/getNextPageParamForPagination";
import { Notification } from "../type/notification";

const getNotifications = async (
  pageParam: number = 1,
): Promise<ResponseWithPagination<Notification[]>> => {
  const response = await axios({
    url: `notification/list?page=${pageParam}&limit=10`,
    method: "GET",
  });

  return response as unknown as ResponseWithPagination<Notification[]>;
};

function useGetNotifications() {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam = 1 }) => await getNotifications(pageParam),
    getNextPageParam: getNextPageParamForPagination,
  });
}

export default useGetNotifications;

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
export type Filter =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastMonth"
  | "lastYear"
  | "allTime";

const getRevenueNumber = async ({
  role,
  filter,
}: {
  role: RoleTypes;
  filter?: Filter;
}): Promise<{ totalRevenue: number }> => {
  const response = await axios({
    url: `/${role}/dashboard/revenue-numbers?range=${filter}`,
    method: "GET",
  });

  //   @ts-ignore
  return response.formatedData;
};

function useGetRevenueNumber({
  role = "manager",
  filter = "allTime",
}: {
  role?: RoleTypes;
  filter?: Filter;
}) {
  return useQuery({
    queryKey: ["revenue-number", role, filter],
    queryFn: async () => await getRevenueNumber({ role, filter }),
  });
}

export default useGetRevenueNumber;

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

type Range =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastMonth"
  | "lastYear"
  | "allTime";

const getRevenueWithQuery = async ({
  range,
}: {
  range: Range;
}): Promise<any> => {
  const response = await axios({
    url: `/billing/admin/revenue?range=${range}`,
    method: "GET",
  });

  return response.data;
};

function useGetRevenueWithQuery({ range }: { range: Range }) {
  return useQuery({
    queryKey: ["current-bill", range],
    queryFn: async () => await getRevenueWithQuery({ range }),
  });
}

export default useGetRevenueWithQuery;

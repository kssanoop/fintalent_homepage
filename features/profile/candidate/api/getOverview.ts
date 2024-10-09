import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface GetOverviewProps {
  fromDate: Date | number;
  toDate: Date | number;
}

export const getOverview = async ({ fromDate, toDate }: GetOverviewProps) => {
  const fromDateStr = format(fromDate, "yyyy-MM-dd");
  const toDateStr = format(toDate, "yyyy-MM-dd");
  console.log("from date:", fromDate, "toDate:", toDate);
  return await axios
    .get(
      `/candidate/dashboard/overview?dateFrom=${fromDateStr}&dateTo=${toDateStr}`,
    )
    .then((res) => res.data);
};

export const useGetOverview = (fromDate: Date, toDate: Date) => {
  return useQuery({
    queryFn: async () => await getOverview({ fromDate, toDate }),
    queryKey: ["get-overview", fromDate, toDate],
  });
};

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface GetPlatformOverviewProps {
  fromDate: Date | number;
  toDate: Date | number;
}

export const getPlatformOverview = async ({
  fromDate,
  toDate,
}: GetPlatformOverviewProps) => {
  const fromDateStr = format(fromDate, "yyyy-MM-dd");
  const toDateStr = format(toDate, "yyyy-MM-dd");
  console.log("from date:", fromDate, "toDate:", toDate);
  return await axios
    .get(
      `candidate/dashboard/platform-overview?dateFrom=${fromDateStr}&dateTo=${toDateStr}`,
    )
    .then((res) => res.data);
};

export const useGetPlatformOverview = (fromDate: Date, toDate: Date) => {
  return useQuery({
    queryFn: async () => await getPlatformOverview({ fromDate, toDate }),
    queryKey: ["get-platform-overview", fromDate, toDate],
  });
};

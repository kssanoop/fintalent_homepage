import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Job } from "../../schema/all-jobs-schema";

const getJobs = async (query: string, filters: any): Promise<Job[]> => {
  const response = await axios({
    url: "/job/teamlead/query",
    method: "POST",
    data: { search: query, ...filters },
  });
  console.log(response);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  return response.data;
};

function useGetJobsForTeamLead(arg: { search: string }) {
  const { search, ...filters } = arg;
  return useQuery({
    queryKey: ["all-jobs-for-team-lead", search, filters],
    queryFn: async () => await getJobs(search, filters),
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export default useGetJobsForTeamLead;

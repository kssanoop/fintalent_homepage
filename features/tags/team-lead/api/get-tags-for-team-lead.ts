import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TagsFilterDataType } from "../../recruiter/api/get-tags-recruiter";

type FilterType = {
  filters?: TagsFilterDataType;
};

export const getTagsForTeamLead = async ({ filters }: FilterType) => {
  const response = await axios({
    method: "POST",
    url: "/tag/teamlead/filter",
    data: filters,
  });
  return response.data;
};

export const useGetTagsForTeamLead = (arg?: FilterType) => {
  const { filters } = arg || {};
  return useQuery({
    queryKey: ["tags-team-lead", filters],
    queryFn: async () => await getTagsForTeamLead({ filters }),
  });
};

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TagsFilterDataType } from "../../recruiter/api/get-tags-recruiter";
import { RoleTypes } from "@/types/authorization";

type FilterType = {
  filters?: TagsFilterDataType;
  roleType: RoleTypes | undefined;
};

export const getTagsForAdmin = async ({ filters, roleType }: FilterType) => {
  const response = await axios({
    method: "POST",
    url: `/tag/${roleType}/filter`,
    data: filters,
  });
  return response.data;
};

export const useGetTagsForadmin = (arg?: FilterType) => {
  const { filters, roleType } = arg || {};
  return useQuery({
    queryKey: ["tags-admin", filters, roleType],
    queryFn: async () => await getTagsForAdmin({ filters, roleType }),
  });
};

import { RoleTypes } from "@/types/authorization";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getTagById = async (tagId: string, roleType: RoleTypes) => {
  return await axios
    .get(`/tag/${roleType}/${tagId}/tag`)
    .then((res) => res?.data);
};

export const useGetTagById = (tagId: string, roleType: RoleTypes) => {
  return useQuery({
    queryFn: async () => await getTagById(tagId, roleType),
    queryKey: ["get-tag-by-id", tagId, roleType],
  });
};

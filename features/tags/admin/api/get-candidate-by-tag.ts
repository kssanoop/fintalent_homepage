import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { TagsDataType } from "../../recruiter/api/recruiter/type/tags-data-type";
import { RoleTypes } from "@/types/authorization";

const getCandidatesByTags = async (
  roleType: RoleTypes,
  tagId: string,
  search: string,
  filters?: any,
): Promise<TagsDataType[]> => {
  const response = await axios({
    url: `/tag/${roleType}/${tagId}/candidates`,
    method: "POST",
    data: { search, ...filters },
  });
  return response.data;
};

function useGetCandidatesByTagsAdmin(
  arg: { search: string; tagId: string; roleType: RoleTypes } = {
    search: "",
    tagId: "",
    roleType: "admin",
  },
) {
  const { search, tagId, roleType, ...filters } = arg;
  return useQuery({
    queryKey: ["get-candidates-by-tag-admin", filters, tagId, search, roleType],
    queryFn: async () =>
      await getCandidatesByTags(roleType, tagId, search, filters),
  });
}

export default useGetCandidatesByTagsAdmin;

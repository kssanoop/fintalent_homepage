import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { TagsDataType } from "../type/tags-data-type";

const getCandidatesByTags = async (
  tagId: string,
  search: string,
  filters?: any,
): Promise<TagsDataType[]> => {
  const response = await axios({
    url: `/tag/recruiter/${tagId}/candidates`,
    method: "POST",
    data: { search, ...filters },
  });
  return response.data;
};

function useGetCandidatesByTags(
  arg: { search: string; tagId: string } = { search: "", tagId: "" },
) {
  const { search, tagId, ...filters } = arg;
  return useQuery({
    queryKey: ["get-candidates-by-recruiter", filters, tagId, search],
    queryFn: async () => await getCandidatesByTags(tagId, search, filters),
  });
}

export default useGetCandidatesByTags;

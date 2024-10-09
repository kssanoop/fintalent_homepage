import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { TagsDataType } from "../type/tags-data-type";

const getTagsByFilter = async (
  query: string,
  filters?: any,
): Promise<TagsDataType[]> => {
  const response = await axios({
    url: "/tag/recruiter/filter",
    method: "POST",
    data: { search: query, ...filters },
  });
  return response.data;
};

function useGetTagsByFilter(arg: { search: string } = { search: "" }) {
  const { search, ...filters } = arg;
  return useQuery({
    queryKey: ["get-tags-by recruiter", search, filters],
    queryFn: async () => await getTagsByFilter(search, filters),
  });
}

export default useGetTagsByFilter;

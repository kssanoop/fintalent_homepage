import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getTagsByID = async (tagId: string | undefined) => {
  return await axios.get(`/tag/recruiter/${tagId}/tag`).then((res) => res.data);
};

export const useGetTagsByID = (tagId: string | undefined) => {
  return useQuery({
    queryFn: async () => await getTagsByID(tagId),
    queryKey: ["get-tags-by-id", tagId],
  });
};

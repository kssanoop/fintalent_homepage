import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type TagsFilterDataType = {
  tagCode: string;
  location: string[];
  skills: string[];
  experienceLevel: string[];
  datePosted: string;
  candidateCount: number;
  companyName: string;
  recruiterName: string;
  status?: "active" | "inactive" | "all";
};

interface getTagsbyRecruiterProps {
  data?: TagsFilterDataType;
}

export const getTagsbyRecruiter = async ({ data }: getTagsbyRecruiterProps) => {
  const response = await axios({
    method: "POST",
    url: "/tag/recruiter/filter",
    data,
  });
  return response.data;
};

export const useGetTagsbyRecruiter = (arg?: {
  data?: getTagsbyRecruiterProps["data"];
}) => {
  const { data } = arg || {};
  return useQuery({
    queryKey: ["tags-recruiter", data],
    queryFn: async () => await getTagsbyRecruiter({ data }),
  });
};

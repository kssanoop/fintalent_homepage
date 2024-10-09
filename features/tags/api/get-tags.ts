import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TagsFilterDataType } from "../recruiter/api/get-tags-recruiter";
import { RoleTypes } from "@/types/authorization";

export const getTags = async ({
  filters,
  role,
}: {
  filters: TagsFilterDataType | undefined;
  role: RoleTypes;
}) => {
  const response = await axios({
    method: "POST",
    url: `/tag/${role}/filter`,
    data: filters || {},
  });
  return response.data;
};

export const useGetTags = ({
  filters,
  role = "admin",
}: {
  filters?: TagsFilterDataType;
  role?: RoleTypes;
}) => {
  return useQuery({
    queryKey: ["tags", filters, role],
    queryFn: async () => await getTags({ filters, role }),
  });
};

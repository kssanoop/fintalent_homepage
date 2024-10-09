import { RoleTypes } from "@/types/authorization";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type candidateByIdType = {
  candidateId: string;
  roleType?: RoleTypes;
};

const getCandidateById = async ({
  candidateId,
  roleType,
}: candidateByIdType) => {
  return await axios
    .get(`/candidate/${roleType || "admin"}/details/${candidateId}`)
    .then((res) => res.data);
};

export const useGetCandidateByIdandRole = ({
  candidateId,
  roleType,
}: candidateByIdType) => {
  return useQuery({
    queryKey: ["get-candidate-by-id", candidateId, roleType],
    queryFn: async () => await getCandidateById({ candidateId, roleType }),
  });
};

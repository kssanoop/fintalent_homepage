import { RoleTypes } from "@/types/authorization";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getCandidatesByJobId = async ({
  jobId,
  role,
}: {
  jobId: string;
  role: RoleTypes;
}) => {
  return await axios
    .get(`/job/${role}/applications/${jobId}/all`)
    .then((res) => res.data);
};

export const useGetCandidatesByJobId = ({
  jobId,
  role = "admin",
}: {
  jobId: string;
  role?: RoleTypes;
}) => {
  return useQuery({
    queryFn: async () => await getCandidatesByJobId({ jobId, role }),
    queryKey: ["get-application-by-Id", jobId, role],
  });
};

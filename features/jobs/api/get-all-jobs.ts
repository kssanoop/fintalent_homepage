import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { AllJobsSchema } from "../schema/all-jobs-schema";
import { RoleTypes } from "@/types/authorization";

const getAllJobs = async (role: RoleTypes): Promise<AllJobsSchema> => {
  const response = await axios.get(`/job/${role}`);
  return response.data;
};

function useGetAllJobs({ role = "recruiter" }: { role?: RoleTypes }) {
  return useQuery({
    queryKey: ["all-jobs", role],
    queryFn: async () => await getAllJobs(role),
    refetchOnWindowFocus: false,
  });
}

export default useGetAllJobs;

import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { RecruiterProfile } from "../type/recruiter-profile";

const getRecruiterProfile = async (): Promise<RecruiterProfile> => {
  return await axios.get("/recruiter/profile").then((res) => res.data);
};

export const useGetRecruiterProfile = () => {
  return useQuery({
    queryKey: ["profile-recruiter"],
    queryFn: async () => await getRecruiterProfile(),
  });
};

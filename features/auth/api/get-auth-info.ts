import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getAuthInfo = async (): Promise<{
  auth: {
    _id: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  userDetails: {
    accountVerifiedStatus: string;
    profileVerified: boolean;
    docStatus: string;
    role: string;
  };
}> => {
  return await axios.get("/auth/me").then((res) => res.data);
};

export const useGetAuthInfo = () => {
  return useQuery({
    queryFn: async () => await getAuthInfo(),
    queryKey: ["auth-info"],
  });
};

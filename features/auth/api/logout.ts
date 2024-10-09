import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const logout = async () => {
  await axios({
    url: "/auth/logout",
    method: "DELETE",
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

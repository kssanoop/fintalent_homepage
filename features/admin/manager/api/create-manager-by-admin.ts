import { ManagerSchema } from "@/features/managers/admin/schema/manager-schema";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const createManagerByAdmin = async (data: ManagerSchema) => {
  return await axios({
    url: "/admin/manager",
    method: "POST",
    data,
  });
};

export const useCreateManagerByAdmin = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: createManagerByAdmin,
    onSuccess: (response: any) => {
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useCreateManagerByAdmin;

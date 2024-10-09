import { ManagerSchema } from "@/features/managers/admin/schema/manager-schema";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const editManagerByAdmin = async ({
  data,
  managerId,
}: {
  data: ManagerSchema;
  managerId: string;
}) => {
  return await axios({
    url: `/admin/manager/${managerId}`,
    method: "PUT",
    data,
  });
};

export const useEditManagerByAdmin = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: editManagerByAdmin,
    onSuccess: (response: any) => {
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useEditManagerByAdmin;

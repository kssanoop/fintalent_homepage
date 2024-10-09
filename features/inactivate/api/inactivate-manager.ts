import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InactivateManagerSchema } from "../schema/inactivate-manager-schema";
import { toast } from "sonner";
import { RoleTypes } from "@/types/authorization";

type Args = {
  managerId: string;
  data: InactivateManagerSchema;
};

const inactivateManager = async ({ managerId, data }: Args) => {
  return await axios({
    url: `/admin/manager/inactivate-manager/${managerId}`,
    method: "PUT",
    data,
  });
};

export const useInactivateManager = (
  handleSuccess: any,
  role: RoleTypes = "admin",
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inactivateManager,
    onSuccess: (response) => {
      handleSuccess(response);
      if (role === "admin")
        queryClient.invalidateQueries({ queryKey: ["managers-for-admin"] });
      toast.success("Manager inactivated successfully");
    },
    onError: (error) => {
      toast.error("Error inactivating manager");
      console.log(error);
    },
  });
};

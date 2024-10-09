import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RoleTypes } from "@/types/authorization";

type Args = {
  managerId: string;
};

const activateManager = async ({ managerId }: Args) => {
  return await axios({
    url: `/admin/manager/activate-manager/${managerId}`,
    method: "PUT",
  });
};

export const useActivateManager = (
  handleSuccess: any,
  role: RoleTypes = "admin",
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateManager,
    onSuccess: (response) => {
      handleSuccess(response);
      if (role === "admin")
        queryClient.invalidateQueries({ queryKey: ["managers-for-admin"] });
      toast.success("Manager activated successfully");
    },
    onError: (error) => {
      toast.error("Error activating manager");
      console.log(error);
    },
  });
};

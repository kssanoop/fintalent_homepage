import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface assignManagerProps {
  companyId: string;
  managerId: string;
}

const assignManager = async ({ companyId, managerId }: assignManagerProps) => {
  // console.log("companyId:", companyId);
  // console.log("ManagerId:", managerId);
  return await axios.put(
    `/recruiter/company/assign-manager/${companyId}/${managerId}`,
  );
};

export const useAssignManager = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: assignManager,
    onSuccess: (response) => handleSuccess(response),
    onError: (error) => handleError(error),
  });
};

import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const assignCompaniesByAdmin = async ({
  companies,
  managerId,
}: {
  companies: string[];
  managerId: string;
}) => {
  return await axios({
    url: `/admin/manager/assign-companies/${managerId}`,
    method: "PUT",
    data: { companies },
  });
};

export const useAssignCompaniesByAdmin = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignCompaniesByAdmin,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["recruitment-companies-for-admin-under-manager"],
      });
      handleSuccess(response);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useAssignCompaniesByAdmin;

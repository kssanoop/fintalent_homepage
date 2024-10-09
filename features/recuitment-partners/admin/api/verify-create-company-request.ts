import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCompanySchema } from "../Schema/add-company-schema";

type verifyCreateCompanyRequestProps = {
  data: AddCompanySchema;
  recruiterId: string | undefined;
};

export const verifyCreateCompanyRequest = async ({
  data,
  recruiterId,
}: verifyCreateCompanyRequestProps) => {
  return await axios.put(`/recruiter/company/verify/${recruiterId}`, data);
};

export const useVerifyCreateCompanyRequest = (
  handleSuccess: any,
  handleError: any,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyCreateCompanyRequest,
    onSuccess: (data) => {
      handleSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["all-company-list-pending"] });
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

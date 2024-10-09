import { axios } from "@/lib/axios";
import { AddCompanySchema } from "../Schema/add-company-schema";
import { useMutation } from "@tanstack/react-query";

export const createCompany = async (data: AddCompanySchema) => {
  return await axios.post(`/recruiter/company/add`, data);
};

export const useCreateCompany = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: createCompany,
    onSuccess: (response) => {
      console.log("response from create company", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

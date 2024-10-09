import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AddRecruiterSchema } from "../Schema/add-recruiter-schema";

interface addRecruiterProps {
  data: AddRecruiterSchema;
  companyId: string;
}

export const addRecruiter = async ({ data, companyId }: addRecruiterProps) => {
  return await axios.post(
    `/recruiter/profile/company/add-recruiter/${companyId}`,
    data,
  );
};

export const useAddRecruiter = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: addRecruiter,
    onSuccess: (response) => {
      console.log("response from add Recruiter", response?.data?.message);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

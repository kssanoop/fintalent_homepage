import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AddRecruiterSchema } from "../Schema/add-recruiter-schema";

type verifyCreateCompanyRequestProps = {
  data: AddRecruiterSchema;
  recruiterId: string | undefined;
};

export const acceptJoinCompanyRequest = async ({
  data,
  recruiterId,
}: verifyCreateCompanyRequestProps) => {
  return await axios.put(
    `/recruiter/profile/verify-join-company/${recruiterId}`,
    data,
  );
};

export const useAcceptJoinCompanyRequest = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: acceptJoinCompanyRequest,
    onSuccess: (data) => {
      // console.log("response from accept Join Company Request", data);
      handleSuccess(data);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

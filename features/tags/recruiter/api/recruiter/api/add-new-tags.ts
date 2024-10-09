import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AddRequirementFormType } from "../type/add-form-type";

const addNewTags = async (data: AddRequirementFormType) => {
  return await axios.post("/tag/recruiter/create-tag", data);
};

export const useGetNewTags = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: addNewTags,
    onSuccess(data) {
      handleSuccess(data);
    },
    onError(error) {
      handleError(error);
    },
  });
};

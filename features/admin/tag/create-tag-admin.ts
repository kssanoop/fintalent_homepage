import { axios } from "@/lib/axios";
import { TagFormDataType } from "./tag-data-type-form";
import { useMutation } from "@tanstack/react-query";

interface addNewTagAdminProps {
  data: TagFormDataType;
}

const addNewTagAdmin = async ({ data }: addNewTagAdminProps) => {
  return await axios({
    method: "POST",
    url: `/tag/admin/create-tag`,
    data,
  });
};

export const useAddNewTagAdmin = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: addNewTagAdmin,
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

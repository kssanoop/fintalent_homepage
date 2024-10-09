import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const updateJobPreference = async (data: any) => {
  return await axios.put("/candidate/profile", data);
};

export const useUpdateobPreference = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: updateJobPreference,
    onSuccess: (response) => {
      console.log("response from job Preference: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

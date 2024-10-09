import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const updateSkills = async (data: any) => {
  return await axios.put("/candidate/profile/skills", data);
};

export const useUpdatSkills = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: updateSkills,
    onSuccess: (response) => {
      console.log("response from Edit Skill: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

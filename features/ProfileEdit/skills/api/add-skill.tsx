import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const addSkills = async (data: any) => {
  return await axios.post("/candidate/profile/skills", data);
};

export const useAddSkills = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: addSkills,
    onSuccess: (response) => {
      console.log("response from Add Skill: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

import { profileSchema } from "@/features/auth/candidate/schemas/profile-schema";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const sendCandidateInfoAdmin = async (profileData: profileSchema) => {
  return await axios({
    url: `/candidate/admin/create`,
    method: "POST",
    data: profileData,
  });
};

const useCreateCandidateAdmin = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: sendCandidateInfoAdmin,
    onSuccess: (data) => {
      console.log(data);
      handleSuccess(data);
    },
    onError: (err: any) => {
      console.log(err);
      handleError(err);
    },
  });
};

export default useCreateCandidateAdmin;

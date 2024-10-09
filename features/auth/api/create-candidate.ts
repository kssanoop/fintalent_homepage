import { axios } from "@/lib/axios";
import { profileSchema } from "../candidate/schemas/profile-schema";
import { useMutation } from "@tanstack/react-query";
import storage from "@/utils/storage";
// import { toast } from "sonner";

const sendCandidateInfo = async (profileData: profileSchema) => {
  return await axios({
    url: `/candidate/profile`,
    method: "POST",
    data: profileData,
  });
};

const useCreateCandidate = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: sendCandidateInfo,
    onSuccess: (response) => {
      const cookie = storage.getDatafromCookie("user_data");
      const modifiedCookie = {
        ...cookie,
        userDetails: {
          ...cookie.userDetails,
          accountVerifiedStatus: "pendingVerification",
        },
      };
      storage.setCookieData("user_data", JSON.stringify(modifiedCookie));
      handleSuccess(response);
    },
    onError: (err: any) => {
      console.log(err);
      handleError(err);
    },
  });
};

export default useCreateCandidate;

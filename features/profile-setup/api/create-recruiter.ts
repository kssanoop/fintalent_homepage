import { axios } from "@/lib/axios";
import RecruiterSchema from "../recruiter/schemas/recruiter-profile";
import { useMutation } from "@tanstack/react-query";
import storage from "@/utils/storage";

const sendRecruiterInfo = async (profileData: RecruiterSchema) => {
  return await axios({
    url: `/recruiter/profile`,
    method: "POST",
    data: profileData,
  });
};

const useCreateRecruiter = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: sendRecruiterInfo,
    onSuccess: (data) => {
      const cookie = storage.getDatafromCookie("user_data");
      const modifiedCookie = {
        ...cookie,
        userDetails: {
          ...cookie.userDetails,
          accountVerifiedStatus: "pendingVerification",
        },
      };
      storage.setCookieData("user_data", JSON.stringify(modifiedCookie));
      handleSuccess(data);
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useCreateRecruiter;

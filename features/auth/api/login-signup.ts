import type { loginSignUpSchema } from "@/features/auth/schema/auth-schema";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import storage from "@/utils/storage";

const loginSignup = async (credentials: loginSignUpSchema) => {
  return await axios({
    url: `/auth/${credentials.action}`,
    method: "POST",
    data: {
      email: credentials.email,
      password: credentials.password,
      role: credentials.role,
    },
  });
};

export const useLoginSignUp = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: loginSignup,
    onSuccess: (response) => {
      // const cookie = storage.getDatafromCookie("user_data");userDetails: {
      //   accountVerifiedStatus: 'pendingVerification'
      // console.log(cookie);
      console.log("response from useloginsignup: ", response.data);
      storage.setCookieData("user_data", JSON.stringify(response.data));
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useLoginSignUp;

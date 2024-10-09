import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type Data = {
  _id: string;
  token: string;
  password: string;
};

const forgotPasswordResetPassword = async (data: Data) => {
  return await axios({
    url: `/auth/forgotpassword`,
    method: "POST",
    data,
  });
};

const useForgotPasswordResetPassword = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: forgotPasswordResetPassword,
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

export default useForgotPasswordResetPassword;

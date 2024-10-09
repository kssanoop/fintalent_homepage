import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const sendPasswordResetLink = async (email: string) => {
  return await axios({
    url: `/auth/forgotpassword-send/${email}`,
    method: "GET",
  });
};

const useSendPasswordResetLink = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: sendPasswordResetLink,
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

export default useSendPasswordResetLink;

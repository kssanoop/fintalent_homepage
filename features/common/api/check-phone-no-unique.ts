import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

const checkPhoneNoUnique = async ({ phoneNo }: { phoneNo: string }) => {
  await axios({
    url: "/common/checkPhoneNoUnique",
    method: "POST",
    data: {
      phoneNo,
    },
  });
};

const useCheckPhoneNoUnique = (handleSuccess: any, handleError: any) => {
  return useMutation({
    mutationFn: checkPhoneNoUnique,
    onSuccess: (response: any) => {
      handleSuccess();
    },
    onError: (err: any) => {
      handleError(err);
    },
  });
};

export default useCheckPhoneNoUnique;

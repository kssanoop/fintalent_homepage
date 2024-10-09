import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const registerView = async ({ candidateId }: { candidateId: string }) => {
  return await axios({
    url: `/candidate/profile/view/${candidateId}`,
    method: "POST",
  });
};

// Api to acknowledge the backend the selected page has been viewed
export const useRegisterView = () => {
  return useMutation({
    mutationFn: registerView,
    onSuccess: () => {
      console.log("success");
    },
  });
};

export default useRegisterView;

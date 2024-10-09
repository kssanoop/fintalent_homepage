import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const rejectJoinCompanyRequest = async (recruiterId: string) => {
  console.log("recruiter Id:", recruiterId);
  return await axios.put(
    `/recruiter/profile/reject-join-company/${recruiterId}`,
  );
};

export const useRejectJoinCompanyRequest = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: rejectJoinCompanyRequest,
    onSuccess: (data) => {
      console.log("response from reject Join Company Request", data);
      handleSuccess(data);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

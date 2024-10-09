import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const rejectJob = async ({
  jobApplicationId,
}: {
  jobApplicationId: string;
}) => {
  return await axios({
    url: `/job/application/reject-application/${jobApplicationId}`,
    method: "POST",
  });
};

export const useRejectJobApplicationByRecruiter = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectJob,
    onSuccess: (response) => {
      handleSuccess(response);
      queryClient.invalidateQueries({
        queryKey: ["job-application-by-recruiter"],
      });
    },

    onError: (err) => {
      handleError(err);
    },
  });
};

export default useRejectJobApplicationByRecruiter;

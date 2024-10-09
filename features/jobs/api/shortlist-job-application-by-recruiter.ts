import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const shortlist = async ({
  jobApplicationId,
}: {
  jobApplicationId: string;
}) => {
  return await axios({
    url: `/job/application/shortlist-application/${jobApplicationId}
    `,
    method: "POST",
  });
};

export const useShortlistJobApplicationByRecruiter = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shortlist,
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

export default useShortlistJobApplicationByRecruiter;

import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type UpdateRecruiterProfileSchema = {
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  email: string;
  fullName: string;
  designation: string;
  phoneNo: string;
  linkedIn: string;
  location: string;
};

export const updateRecruiterProfile = async (
  data: UpdateRecruiterProfileSchema,
) => {
  console.log(data);
  return await axios.put(`/recruiter/profile`, {
    ...data,
  });
};

export const useUpdateRecruiterProfile = (handleSuccess: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecruiterProfile,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile-recruiter"] });
      handleSuccess(response);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

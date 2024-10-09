import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AvailabilitySchema } from "../schema/availability-schema";

const editAvailability = async (data: { availability: AvailabilitySchema }) => {
  return await axios({
    url: `/candidate/profile/availability`,
    method: "PUT",
    data,
  });
};

export const useEditAvailability = (
  handleSuccess: (response: any) => void,
  handleError: (err: any) => void,
) => {
  return useMutation({
    mutationFn: editAvailability,
    onSuccess: (response) => {
      console.log("response from edit availabilty: ", response);
      handleSuccess(response);
    },
    onError: (err) => {
      handleError(err);
    },
  });
};

export default useEditAvailability;

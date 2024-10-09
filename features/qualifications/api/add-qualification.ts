import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QualificationShema } from "../type/qualification-schema";

const addQualification = async (data: QualificationShema) => {
  return await axios({
    url: "/misc/qualifications",
    method: "POST",
    data,
  });
};

export const useAddQualification = ({
  handleSuccess,
}: {
  handleSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addQualification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });
      handleSuccess();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export default useAddQualification;

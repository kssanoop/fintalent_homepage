import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateViewCostOfCompanySchema } from "../schema/updateViewCostOfCompanySchema";

export const updateViewCostOfCompany = async ({
  data,
  companyId,
}: {
  data: UpdateViewCostOfCompanySchema;
  companyId: string;
}) => {
  return await axios.put(`/recruiter/company/update-cost/${companyId}`, data);
};

export const useUpdateViewCostOfCompany = () => {
  return useMutation({
    mutationFn: updateViewCostOfCompany,

    onError: (err: any) => {
      toast.error(err.response.data.message || "Failed to update");
    },
  });
};

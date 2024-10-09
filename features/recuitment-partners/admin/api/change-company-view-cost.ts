import { BillingAmountFormType } from "@/components/Admin/recruitment-partners/components/billing-amount";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface changeCompnayViewCostProps {
  companyId: string;
  data: BillingAmountFormType;
}
const changeCompnayViewCost = async ({
  companyId,
  data,
}: changeCompnayViewCostProps) => {
  return await axios.put(`/recruiter/company/update-cost/${companyId}`, data);
};

export const useChangeCompnayViewCost = (
  handleSuccess: any,
  handleError: any,
) => {
  return useMutation({
    mutationFn: changeCompnayViewCost,
    onSuccess(response) {
      handleSuccess(response);
    },
    onError(error) {
      handleError(error);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { BillingStatus } from "../types/billing-status";

const updateBillingStatus = async ({
  billingId,
  action,
}: {
  billingId: string;
  action: BillingStatus;
}) => {
  console.log(`billing/admin/billing-status/${billingId}/${action}`);
  await axios({
    url: `billing/admin/billing-status/${billingId}/${action}`,
    method: "PUT",
  });
};

function useUpdateBillingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBillingStatus,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ["billings-of-company"],
      });
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
}

export default useUpdateBillingStatus;

import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Billing } from "../types/billing";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { getNextPageParamForPagination } from "@/utils/getNextPageParamForPagination";

const getBillingsOfCompany = async ({
  companyId,
  pageParam = 1,
}: {
  pageParam: number;
  companyId: string;
}): Promise<ResponseWithPagination<Billing[]>> => {
  const response = await axios({
    url: `/billing/admin/companies/${companyId}?page=${pageParam}&limit=10`,
    method: "GET",
  });

  return response as unknown as ResponseWithPagination<Billing[]>;
};

function useGetBillingsOfCompany({ companyId }: { companyId: string }) {
  return useInfiniteQuery({
    queryKey: ["billings-of-company", companyId],
    queryFn: async ({ pageParam = 1 }) =>
      await getBillingsOfCompany({ pageParam, companyId }),
    getNextPageParam: getNextPageParamForPagination,
  });
}

export default useGetBillingsOfCompany;

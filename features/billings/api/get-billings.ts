import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
import { Billing } from "../types/billing";
import { ResponseWithPagination } from "@/types/response-with-pagination";

const getBillings = async ({
  role,
  pageParam = 1,
}: {
  role: RoleTypes;
  pageParam: number;
}): Promise<ResponseWithPagination<Billing[]>> => {
  const response = await axios({
    url: `/billing/${role}?page=${pageParam}&limit=10`,
    method: "GET",
  });

  return response as unknown as ResponseWithPagination<Billing[]>;
};

function useGetBillings({ role = "recruiter" }: { role?: RoleTypes }) {
  return useInfiniteQuery({
    queryKey: ["billing", role],
    queryFn: async ({ pageParam = 1 }) =>
      await getBillings({ role, pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length ? allPages.length + 1 : undefined,
  });
}

export default useGetBillings;

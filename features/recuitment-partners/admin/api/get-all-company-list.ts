import { AdminCompanyFilter } from "@/features/admin/recruitment-partner/type/admin-company-filter-recruitment";
import { axios } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CompanyDataType } from "../type/company-list-data-type";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { getNextPageParamForPagination } from "@/utils/getNextPageParamForPagination";

export const getAllCompaniesList = async (
  filters?: AdminCompanyFilter,
  pageParam: number = 1,
): Promise<ResponseWithPagination<CompanyDataType[]>> => {
  const response = await axios({
    url: `/recruiter/company/all-active?page=${pageParam}&limit=10`,
    method: "POST",
    data: filters || {},
  });
  return response as unknown as ResponseWithPagination<CompanyDataType[]>;
};

const hasFilter = (filters?: AdminCompanyFilter): boolean => {
  return (
    filters !== undefined &&
    Object.values(filters).some(
      (value) =>
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === "string" && value !== "") ||
        (typeof value === "number" && value !== 0),
    )
  );
};

export const useGetAllCompanyList = (filters?: AdminCompanyFilter) => {
  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      if (hasFilter(filters)) {
        // Fetch data with filters if any filter is applied
        return await getAllCompaniesList(filters, pageParam);
      } else {
        // Fetch all data when no filter is applied
        return await getAllCompaniesList(undefined, pageParam);
      }
    },
    getNextPageParam: getNextPageParamForPagination<CompanyDataType[]>,
    queryKey: ["get-all-company-list", filters],
  });
};

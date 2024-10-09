import { ResponseWithPagination } from "@/types/response-with-pagination";

export const getNextPageParamForPagination = <T extends any[]>(
  lastPage: ResponseWithPagination<T>,
  allPages: Array<ResponseWithPagination<T>>,
) => (lastPage.data.length ? allPages.length + 1 : undefined);

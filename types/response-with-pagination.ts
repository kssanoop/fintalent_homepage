export type ResponseWithPagination<T> = {
  data: T;
  message: string;
  success: boolean;
  count: number;
  offset: number;
  limit: number;
};

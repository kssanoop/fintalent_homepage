import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

export type FetchNextList<T> = {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<T>>;
};

// fetch next list on pagination
export const useFetchNextList = <T>(props: FetchNextList<T>) => {
  const { isFetchingNextPage, hasNextPage, fetchNextPage } = props;
  const fetchNextList = () => {
    if (isFetchingNextPage) return;
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return { fetchNextList, ...props };
};

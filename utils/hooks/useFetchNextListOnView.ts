import { useInView } from "react-intersection-observer";
import { FetchNextList, useFetchNextList } from "./useFetchNextList";

// fetch next list on pagination
export const useFetchNextListOnView = <T>(arg: FetchNextList<T>) => {
  const { ref, inView } = useInView({
    threshold: 0,
  }) as any;

  const { fetchNextList } = useFetchNextList<T>(arg);

  if (inView) {
    fetchNextList();
  }

  return { ref };
};

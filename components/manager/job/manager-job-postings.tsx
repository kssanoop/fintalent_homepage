import JobPostingsListContainer from "../../job/job-postings/job-postings-list-container";
import SearchBarStateHolder from "../../search-bar/search-bar-state-holder";
import JobCardSkeleton from "../../skeleton/job-card-skeleton";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { AllJobsSchema } from "@/features/jobs/schema/all-jobs-schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResponseWithPagination } from "@/types/response-with-pagination";

export type ManagerJobPostingsProps = {
  handleSearchQuery: (inputValue: string) => void;
  dataResponse: UseInfiniteQueryResult<
    ResponseWithPagination<AllJobsSchema>,
    unknown
  >;
};

const ManagerJobPostings = ({
  handleSearchQuery,
  dataResponse,
}: ManagerJobPostingsProps) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = dataResponse;

  const fetchNextList = () => {
    if (isFetchingNextPage) return;
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  console.log(data);
  // const { data } = responseData;
  // //   TODO: implement error boundary and avoid SearchBar UI from the error UI
  if (isError) {
    console.log(error);
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-[13px] md:mb-5 md:gap-0">
        <SearchBarStateHolder
          handleSearchQuery={handleSearchQuery}
          placeholder="Search job by title"
        />
      </div>
      {isError ? (
        <h1>Something went wrong.</h1>
      ) : (
        <>
          <h3 className="mb-2.5 font-semibold text-[#5E5E5E]">
            {isLoading ? (
              <div className="h-4" />
            ) : (
              ` Showing  ${data?.pages[0].count} results`
            )}
          </h3>
          <ScrollArea className="h-[calc(100%-92px)]  md:h-[calc(100%-96px)]">
            {isLoading ? (
              <>
                {[...Array(3)].map(() => (
                  <JobCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : (
              <JobPostingsListContainer
                data={data?.pages.flatMap((pg) => pg.data)}
                Interface="manager"
                fetchNextList={fetchNextList}
              />
            )}
          </ScrollArea>
        </>
      )}
    </>
  );
};

export default ManagerJobPostings;

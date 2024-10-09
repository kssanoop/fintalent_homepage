import { AllJobsSchema } from "@/features/jobs/schema/all-jobs-schema";
import JobPostingsListContainer from "../job/job-postings/job-postings-list-container";
import SearchBarStateHolder from "../search-bar/search-bar-state-holder";
import JobCardSkeleton from "../skeleton/job-card-skeleton";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ResponseWithPagination } from "@/types/response-with-pagination";

export type TeamLeadJobPostingsProps = {
  dataResponse: UseInfiniteQueryResult<
    ResponseWithPagination<AllJobsSchema>,
    unknown
  >;
  handleSearchQuery: (inputValue: string) => void;
};

const TeamLeadJobPostings = ({
  dataResponse,
  handleSearchQuery,
}: TeamLeadJobPostingsProps) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = dataResponse;
  console.log(data);

  const fetchNextList = () => {
    if (isFetchingNextPage) return;
    if (hasNextPage) fetchNextPage();
  };

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
          <div className="scroll-container h-[calc(100%-92px)] overflow-hidden hover:overflow-auto md:h-[calc(100%-96px)]">
            {isLoading ? (
              <>
                {[...Array(3)].map(() => (
                  <JobCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : (
              <JobPostingsListContainer
                data={data?.pages.flatMap((pg) => pg.data)}
                Interface="teamlead"
                fetchNextList={fetchNextList}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TeamLeadJobPostings;

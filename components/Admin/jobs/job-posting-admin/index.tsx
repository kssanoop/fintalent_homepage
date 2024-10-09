import React, { Dispatch, SetStateAction } from "react";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { AllJobsSchema } from "@/features/jobs/schema/all-jobs-schema";
import JobsFilterSheet from "@/features/jobs/jobs-filter/component/jobs-filter-sheet";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import SearchBarStateHolder from "@/components/search-bar/search-bar-state-holder";
import JobPostingsListContainer from "@/components/job/job-postings/job-postings-list-container";
import { ResponseWithPagination } from "@/types/response-with-pagination";

export type JobPostingsAdminProps = {
  handleSearchQuery: (inputValue: string) => void;
  dataResponse: UseInfiniteQueryResult<
    ResponseWithPagination<AllJobsSchema>,
    unknown
  >;
  onFilterSubmit: SubmitHandler<JobsFilter>;
  form: UseFormReturn<JobsFilter, any, JobsFilter>;
  isViewAllFilterType: boolean;
  setIsViewAllFilterType: Dispatch<SetStateAction<boolean>>;
};

const JobPostingsAdmin = ({
  handleSearchQuery,
  dataResponse,
  onFilterSubmit,
  form,
  isViewAllFilterType,
  setIsViewAllFilterType,
}: JobPostingsAdminProps) => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = dataResponse;

  const fetchNextList = () => {
    if (isFetchingNextPage) return;
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-[13px] md:mb-5 md:gap-0">
        <SearchBarStateHolder
          handleSearchQuery={handleSearchQuery}
          placeholder="Search job by title"
        />
        <div className="md:hidden">
          <JobsFilterSheet
            onSubmit={onFilterSubmit}
            form={form}
            isViewAllFilterType={isViewAllFilterType}
            setIsViewAllFilterType={setIsViewAllFilterType}
          />
        </div>
      </div>
      {isError ? (
        <h1>Something went wrong.</h1>
      ) : (
        <>
          <h3 className="mb-2.5 font-semibold text-[#5E5E5E]">
            {isLoading ? (
              <div className="h-4" />
            ) : (
              ` Showing ${data?.pages[0].count ?? 0} results`
            )}
          </h3>
          <div className="scroll-container hide-scrollbar h-[calc(100%-92px)] overflow-auto md:h-[calc(100%-96px)]">
            {isLoading ? (
              <>
                {[...Array(3)].map(() => (
                  <JobCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : (
              <JobPostingsListContainer
                data={data?.pages.flatMap((pg) => pg.data)}
                Interface="admin"
                fetchNextList={fetchNextList}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default JobPostingsAdmin;

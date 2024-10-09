import AddJobSheet from "./add-job-sheet";
import JobPostingsListContainer from "./job-postings-list-container";
import React, { Dispatch, SetStateAction } from "react";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import SearchBarStateHolder from "../../search-bar/search-bar-state-holder";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import JobsFilterSheet from "@/features/jobs/jobs-filter/component/jobs-filter-sheet";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { AllJobsSchema } from "@/features/jobs/schema/all-jobs-schema";
import { useFetchNextList } from "@/utils/hooks/useFetchNextList";

export type JobPostingsProps = {
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

const JobPostings = ({
  handleSearchQuery,
  dataResponse,
  onFilterSubmit,
  form,
  isViewAllFilterType,
  setIsViewAllFilterType,
}: JobPostingsProps) => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = dataResponse;

  const { fetchNextList } = useFetchNextList<
    ResponseWithPagination<AllJobsSchema>
  >({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-[13px] md:mb-5 md:gap-0">
        <SearchBarStateHolder
          handleSearchQuery={handleSearchQuery}
          placeholder="Search job by title"
        />
        <div className="hidden md:block">
          <AddJobSheet />
        </div>
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
              `Showing ${data.pages[0].count ?? 0} results`
            )}
          </h3>
          <ScrollArea className="h-[calc(100%-92px)] md:h-[calc(100%-96px)]">
            {isLoading ? (
              <>
                {[...Array(3)].map(() => (
                  <JobCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : (
              <JobPostingsListContainer
                data={data.pages.flatMap((pg) => pg.data)}
                fetchNextList={fetchNextList}
              />
            )}
          </ScrollArea>
        </>
      )}
    </>
  );
};

export default JobPostings;

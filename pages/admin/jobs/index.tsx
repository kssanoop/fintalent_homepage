import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement, useState } from "react";
import Layout from "@/components/layout/primary-layout";
import { ErrorBoundary } from "react-error-boundary";
import HeadBar from "@/components/layout/head-bar";
import ScreeningQuestion from "@/components/Admin/jobs/screening-question";
import JobPostingsAdmin from "@/components/Admin/jobs/job-posting-admin";
import JobFilter from "@/features/jobs/jobs-filter/component/job-filter";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import JobsFilterSheet from "@/features/jobs/jobs-filter/component/jobs-filter-sheet";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import useGetJobsByTitle from "@/features/jobs/api/get-jobs-by-title";
const AdminJobs = () => {
  const [filters, setFilters] = useState<JobsFilter | {}>({});

  const [isViewAllFilterType, setIsViewAllFilterType] =
    useState<boolean>(false);
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();

  const dataResponse = useGetJobsByTitle({
    search: searchQuery,
    role: "admin",
    ...filters,
  });
  console.log(dataResponse.data);

  const form = useForm<JobsFilter>({
    defaultValues: {
      jobType: [],
      location: [],
      experianceLevel: [],
      employmentMode: [],
      jobSchedule: [],
      datePosted: "",
      jobStatus: "",
      salaryBegin: "0",
      salaryEnd: "0",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onFilterSubmit: SubmitHandler<JobsFilter> = (values) => {
    console.log(values);
    setFilters(values);
  };

  const handleSearchQuery = (inputValue: string) => {
    setSearchQuery(inputValue);
  };

  return (
    <div className="flex h-full flex-col md:flex-row md:gap-5">
      <div className="hidden gap-3 md:flex md:w-[24%] md:min-w-[308px] md:flex-col">
        <ScreeningQuestion
          data={dataResponse?.data?.pages.flatMap((pg) => pg.data)}
        />
        <DynamicHeightContainer>
          <JobFilter
            onSubmit={onFilterSubmit}
            form={form}
            isViewAllFilterType={isViewAllFilterType}
            jobsFilterSheet={
              <JobsFilterSheet
                onSubmit={onFilterSubmit}
                form={form}
                isViewAllFilterType={isViewAllFilterType}
                setIsViewAllFilterType={setIsViewAllFilterType}
              />
            }
          />
        </DynamicHeightContainer>
      </div>
      <div className="h-full w-full">
        <JobPostingsAdmin
          handleSearchQuery={handleSearchQuery}
          dataResponse={dataResponse}
          onFilterSubmit={onFilterSubmit}
          form={form}
          isViewAllFilterType={isViewAllFilterType}
          setIsViewAllFilterType={setIsViewAllFilterType}
        />
      </div>
    </div>
  );
};

AdminJobs.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar heading="Job Postings" />
          <ErrorBoundary
            fallback={
              <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
                Something went wrong! Unable to fetch data.
              </div>
            }
            onError={(error: any, errorInfo) => {
              console.log("Error caught!", error);
            }}
          >
            <div className="scroll-container grow overflow-y-auto px-2 py-3 md:p-5 ">
              {page}
            </div>
          </ErrorBoundary>
        </div>
      </Layout>
    </Authorization>
  );
};

export default AdminJobs;

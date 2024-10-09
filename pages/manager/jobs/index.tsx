import { ReactElement, useState } from "react";

import Layout from "@/components/layout/primary-layout";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import HeadBar from "@/components/layout/head-bar";

// import JobsFilter from "@/features/jobs/jobs-filter/component/job-filter";
import ManagerJobPostings from "@/components/manager/job/manager-job-postings";
import JobFilter from "@/features/jobs/jobs-filter/component/job-filter";
import JobsFilterSheet from "@/features/jobs/jobs-filter/component/jobs-filter-sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import useGetJobsByTitle from "@/features/jobs/api/get-jobs-by-title";

const Jobs = () => {
  const [filters, setFilters] = useState<JobsFilter | {}>({});

  const [isViewAllFilterType, setIsViewAllFilterType] =
    useState<boolean>(false);
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();

  const dataResponse = useGetJobsByTitle({
    search: searchQuery,
    ...filters,
    role: "manager",
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
      <div className="hidden md:block md:w-[24%] md:min-w-[300px]">
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
      </div>
      <div className="h-full w-full">
        <ManagerJobPostings
          handleSearchQuery={handleSearchQuery}
          dataResponse={dataResponse}
        />
      </div>
    </div>
  );
};

Jobs.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar heading="Job postings" />
          <div className="grow overflow-y-auto px-2 py-3 md:px-5 md:py-[27px]">
            {page}
          </div>
        </div>
      </Layout>
    </Authorization>
  );
};

export default Jobs;

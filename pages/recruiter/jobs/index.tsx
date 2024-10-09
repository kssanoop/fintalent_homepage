import { ReactElement, useState } from "react";
import Layout from "@/components/layout/primary-layout";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import HeadBar from "@/components/layout/head-bar";
import JobPostings from "@/components/job/job-postings";
import AddJobSheet from "@/components/job/job-postings/add-job-sheet";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import useGetJobsByTitle from "@/features/jobs/api/get-jobs-by-title";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import JobsFilterSheet from "@/features/jobs/jobs-filter/component/jobs-filter-sheet";
import JobFilter from "@/features/jobs/jobs-filter/component/job-filter";
import NotificationButton from "@/components/notification/notification-button";

const Jobs = () => {
  const [filters, setFilters] = useState<JobsFilter | {}>({});

  const [isViewAllFilterType, setIsViewAllFilterType] =
    useState<boolean>(false);
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();

  const dataResponse = useGetJobsByTitle({
    role: "recruiter",
    search: searchQuery,
    ...filters,
  });

  const form = useForm<JobsFilter>({
    defaultValues: {
      jobType: [],
      location: [],
      experianceLevel: [],
      employmentMode: [],
      jobSchedule: [],
      qualifications: [],
      skills: [],
      datePosted: "",
      jobStatus: "",
      salaryBegin: "0",
      salaryEnd: "0",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onFilterSubmit: SubmitHandler<JobsFilter> = (values) => {
    const formattedData = {
      ...values,
      skills: values.skills.map((skill: any) => skill?.value),
      qualifications: values.qualifications?.map((q: any) => q.value),
    };
    console.log(formattedData);

    setFilters(formattedData);
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
        <JobPostings
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

Jobs.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-full w-full flex-col">
          <HeadBar
            heading="Job postings"
            customRightSideComponent={
              <div className="flex items-center gap-3">
                <NotificationButton />
                <div className="md:hidden">
                  <AddJobSheet />
                </div>
              </div>
            }
          />
          <div className="grow overflow-y-auto px-2 py-3 md:px-5 md:py-[27px]">
            {page}
          </div>
        </div>
      </Layout>
    </Authorization>
  );
};

export default Jobs;

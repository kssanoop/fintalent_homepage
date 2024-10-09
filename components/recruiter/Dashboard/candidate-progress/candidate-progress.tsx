import React, { useEffect, useMemo, useState } from "react";
import CandidateProgressTabs from "./candidate-progress-tabs/candidate-progress-tabs";
import DropdownMenuDashboard from "./dropdown-menu";
import useGetAllJobs from "@/features/jobs/api/get-all-jobs";
import useGetJobApplicationByRecruiter from "@/features/jobs/api/get-job-application-by-recruiter";
import TabsLoading from "./candidate-progress-tabs/tabs-loading";
import DynamicWidthContainer from "@/components/layout/dynamic-width-container";
import { useFetchNextList } from "@/utils/hooks/useFetchNextList";

const CandidateProgress = () => {
  const { data, isLoading: isJobsDetailsLoading } = useGetAllJobs({
    role: "recruiter",
  });

  const jobDetails = useMemo(
    () => data?.map((job) => ({ _id: job?._id, title: job?.jobTitle })) || [],
    [data],
  );

  const [selectedJobTitle, setSelectedJobTitle] = useState(
    jobDetails?.[0]?.title,
  );
  const [selectedJob, setSelectedJob] = useState(jobDetails?.[0]?._id);

  useEffect(() => {
    setSelectedJobTitle(jobDetails?.[0]?.title);
    setSelectedJob(jobDetails?.[0]?._id);
  }, [data, jobDetails]);

  const {
    data: jobApplicationData,
    isLoading: isJobsApplicationLoading,
    isFetchingNextPage: isFetchingNextJobApplicationPage,
    hasNextPage: hasNextJobApplicationPage,
    fetchNextPage: fetchNextJobApplicationPage,
  } = useGetJobApplicationByRecruiter({
    stage: "all",
    jobId: selectedJob,
  });

  const { fetchNextList: fetchNextJobApplicationList } = useFetchNextList({
    fetchNextPage: fetchNextJobApplicationPage,
    hasNextPage: hasNextJobApplicationPage,
    isFetchingNextPage: isFetchingNextJobApplicationPage,
  });

  return (
    <div className="flex flex-col gap-3.5">
      <div className="text-[#171717 flex gap-1 text-base tracking-[-0.32px]">
        <p className="font-medium">Candidate progress for</p>
        <DropdownMenuDashboard
          selectedJobTitle={selectedJobTitle}
          setSelectedJobTitle={setSelectedJobTitle}
          jobTitles={jobDetails}
          setSelectedJob={setSelectedJob}
        />
      </div>
      {/* tabs */}
      <div className="flex w-full grow overflow-x-auto">
        {isJobsApplicationLoading || isJobsDetailsLoading ? (
          <DynamicWidthContainer>
            <div className="flex w-full gap-3">
              {[...Array(7)].map(() => (
                <TabsLoading key={crypto.randomUUID()} />
              ))}
            </div>
          </DynamicWidthContainer>
        ) : (
          <CandidateProgressTabs
            joApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            fetchNextList={fetchNextJobApplicationList}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateProgress;

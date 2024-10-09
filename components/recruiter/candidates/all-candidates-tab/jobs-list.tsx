import { AllJobsSchema } from "@/features/jobs/schema/all-jobs-schema";
import InviteToJobCard from "./invite-to-job-card";
import { Dispatch, SetStateAction } from "react";

const JobsList = ({
  jobs,
  setSelectedJobs,
}: {
  jobs: AllJobsSchema;
  setSelectedJobs: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <div>
      {jobs.map((job) => (
        <InviteToJobCard
          key={job._id}
          jobDetails={job}
          setSelectedJobs={setSelectedJobs}
        />
      ))}
    </div>
  );
};

export default JobsList;

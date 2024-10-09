import { AllJobsSchema } from "@/features/jobs/schema/all-jobs-schema";
import JobPostingsCard from "./job-posting-card/job-postings-card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useInView } from "react-intersection-observer";

export type JobPostingListProps = {
  jobs: AllJobsSchema;
  Interface?: string;
  fetchNextList: () => void;
};
const JobPostingsList = ({
  jobs,
  Interface = "recruiter",
  fetchNextList,
}: JobPostingListProps) => {
  const [parent] = useAutoAnimate();
  const { ref, inView } = useInView({
    threshold: 0,
  }) as any;
  if (inView) {
    console.log("FETCHING NEXT LIST");
    fetchNextList();
  }

  return (
    <div ref={parent}>
      {jobs.map((job, i) => {
        if (jobs.length === i + 1) {
          return (
            <JobPostingsCard
              key={job._id}
              ref={ref}
              jobDetails={job}
              Interface={Interface}
            />
          );
        }

        return (
          <JobPostingsCard
            key={job._id}
            jobDetails={job}
            Interface={Interface}
          />
        );
      })}
    </div>
  );
};

export default JobPostingsList;

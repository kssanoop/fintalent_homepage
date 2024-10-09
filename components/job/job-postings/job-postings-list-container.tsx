import JobPostingsList from "./job-postings-list";
import { Card } from "@/components/ui/card";
import { AllJobsSchema } from "@/features/jobs/schema/all-jobs-schema";
import { RoleTypes } from "@/types/authorization";

const JobPostingsListContainer = ({
  data,
  Interface,
  fetchNextList,
}: {
  data: AllJobsSchema | undefined;
  Interface?: RoleTypes;
  fetchNextList: () => void;
}) => {
  return (
    <>
      {!data || data.length === 0 ? (
        <Card className="p-6 text-center text-xl text-brand-blue">
          No jobs added
        </Card>
      ) : (
        <>
          <JobPostingsList
            jobs={data}
            Interface={Interface}
            fetchNextList={fetchNextList}
          />
        </>
      )}
    </>
  );
};

export default JobPostingsListContainer;

import CandidateProgresCard from "@/components/recruiter/Dashboard/candidate-progress/candidate-progres-card";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { Stage } from "@/features/jobs/type/stage";

const CandidateProgressCardContainer = ({
  jobApplicationData,
  stage,
  label,
}: {
  jobApplicationData: JobApplicationSchema[];
  stage: Stage;
  label: string;
}) => {
  const candidates = jobApplicationData?.filter((job) => job?.status === stage);
  console.log(jobApplicationData);
  return (
    <>
      <div className="flex flex-col gap-1 p-3">
        {candidates?.map((item) => (
          <div key={item._id}>
            <CandidateProgresCard data={item} />
          </div>
        ))}
      </div>

      {(candidates?.length === 0 || !candidates) && (
        <div className="flex h-[calc(100%-48px)] items-center justify-center">
          <p className="text-center text-sm font-semibold text-[#171717]">
            No {label} candidates
          </p>
        </div>
      )}
    </>
  );
};

export default CandidateProgressCardContainer;

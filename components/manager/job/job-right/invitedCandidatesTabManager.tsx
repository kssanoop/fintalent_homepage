import { useRouter } from "next/router";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import InvitedCandidate from "@/components/recruiter/job/job-right/invited-candidate";
import { useGetCandidatesByStagesForManager } from "@/features/jobs/manager/api/get-candidates-by-stages-for-manager";

const InvitedCandidatesTabManager = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const {
    data: managerInvitedCandidates,
    isLoading: isManagerDataLoading,
    isError: isManagerError,
    error,
  } = useGetCandidatesByStagesForManager({
    jobId,
    stage: "invited",
  });

  if (isManagerDataLoading)
    return (
      <div className="scroll-container mt-6 h-[calc(100vh-150px)] overflow-auto">
        {[...Array(3)].map(() => (
          <div key={crypto.randomUUID()} className="mb-2">
            <InfoCardSkeleton />{" "}
          </div>
        ))}
      </div>
    );

  if (isManagerError) {
    console.log(error);
    return <h1>Something went wrong</h1>;
  }
  return (
    <>
      <div className="mb-2 flex justify-between">
        <p className="font-medium text-[#5E5E5E]">
          {managerInvitedCandidates?.length === 0 ? (
            "No candidates invited"
          ) : (
            <>
              <span className="font-bold text-brand-black">
                {" "}
                {managerInvitedCandidates?.length}
              </span>{" "}
              candidate{managerInvitedCandidates?.length !== 1 && "s"} invited{" "}
            </>
          )}
        </p>
      </div>
      <div className="scroll-container h-[calc(100vh-150px)] space-y-2 overflow-auto">
        {managerInvitedCandidates && managerInvitedCandidates?.length === 0 ? (
          <h1 className="mt-8 text-center text-xl text-brand-blue">
            No candidates to show
          </h1>
        ) : (
          managerInvitedCandidates?.map((candidate: JobApplicationSchema) => (
            <InvitedCandidate key={candidate._id} candidate={candidate} />
          ))
        )}
      </div>
    </>
  );
};

export default InvitedCandidatesTabManager;

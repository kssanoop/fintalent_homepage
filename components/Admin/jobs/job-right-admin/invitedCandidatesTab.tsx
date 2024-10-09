import { useRouter } from "next/router";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { useGetCandidatesByJobIdAndStages } from "@/features/jobs/admin/api/get-candidate-by-JobId";
import InvitedCandidate from "@/components/recruiter/job/job-right/invited-candidate";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";

const InvitedCandidatesTabAdmin = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const {
    data,
    isLoading: isAdminDataLoading,
    isError: isAdminError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCandidatesByJobIdAndStages({
    jobId,
    stage: "invited",
  });

  const { ref } = useFetchNextListOnView({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isAdminDataLoading)
    return (
      <div className="scroll-container mt-6 h-[calc(100vh-150px)] overflow-auto">
        {[...Array(3)].map(() => (
          <div key={crypto.randomUUID()} className="mb-2">
            <InfoCardSkeleton />{" "}
          </div>
        ))}
      </div>
    );

  if (isAdminError) {
    console.log(error);
    return <h1>Something went wrong</h1>;
  }

  const adminInvitedCandidates = data.pages.flatMap((pg) => pg.data);
  return (
    <>
      <div className="mb-2 flex justify-between">
        <p className="font-medium text-[#5E5E5E]">
          {adminInvitedCandidates?.length === 0 ? (
            "No candidates invited"
          ) : (
            <>
              <span className="font-bold text-brand-black">
                {" "}
                {adminInvitedCandidates?.length}
              </span>{" "}
              candidate{adminInvitedCandidates?.length !== 1 && "s"} invited{" "}
            </>
          )}
        </p>
      </div>
      <div className="scroll-container h-[calc(100vh-150px)] space-y-2 overflow-auto">
        {adminInvitedCandidates && adminInvitedCandidates?.length === 0 ? (
          <h1 className="mt-8 text-center text-xl text-brand-blue">
            No candidates to show
          </h1>
        ) : (
          adminInvitedCandidates?.map((candidate: JobApplicationSchema, i) => {
            if (adminInvitedCandidates.length === i + 1) {
              return (
                <InvitedCandidate
                  key={candidate._id}
                  candidate={candidate}
                  ref={ref}
                />
              );
            }
            return (
              <InvitedCandidate key={candidate._id} candidate={candidate} />
            );
          })
        )}
      </div>
    </>
  );
};

export default InvitedCandidatesTabAdmin;

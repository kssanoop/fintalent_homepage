import { Card } from "@/components/ui/card";
import CandidateCardAvatar from "../../../candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "../../../candidate/candidate-card/candidate-card-info";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { useGetCandidatesByStagesForTeamLead } from "@/features/jobs/team-lead/api/get-candidates-by-stages-for-team-lead";

const HiredCandidatesTabTeamLead = () => {
  const router = useRouter();
  const jobId = router.query.id as string;

  const {
    data: hiredCandidatesAdmin,
    isLoading: isAdminDataLoading,
    isError: isAdminDataError,
    error,
  } = useGetCandidatesByStagesForTeamLead({
    stage: "hired",
    jobId,
  });

  if (isAdminDataLoading)
    return (
      <div className="scroll-container mt-6 h-[calc(100vh-150px)] overflow-auto">
        {[...Array(3)].map(() => (
          <div key={crypto.randomUUID()} className="mb-2">
            <CardSkeleton />
          </div>
        ))}
        ;
      </div>
    );
  if (isAdminDataError) {
    console.log(error);
    return <h1>error</h1>;
  }
  return (
    <div className="scroll-container h-[calc(100vh-118px)] space-y-2 overflow-auto">
      {hiredCandidatesAdmin?.length === 0 ? (
        <h1 className="mt-8 text-center text-xl text-brand-blue">
          No candidates to show
        </h1>
      ) : (
        hiredCandidatesAdmin?.map((candidate: JobApplicationSchema) => (
          <Card key={crypto.randomUUID()} className="flex gap-[18px] p-4">
            <CandidateCardAvatar
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
              className="h-[97px] w-[97px]"
            />
            <div className="flex grow justify-between gap-[18px]">
              <div className="w-5/6">
                <CandidateCardInfo candidate={candidate.candidate} />
              </div>
              <Button
                variant="success"
                className="h-full w-1/6 bg-[#DEFFF2] font-bold text-[#00BA70]"
              >
                Hired
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default HiredCandidatesTabTeamLead;

import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import InviteAcceptedResponse from "@/components/job/job-postings/invite-accepted-response";
import { useGetCandidatesByJobIdAndStages } from "@/features/jobs/admin/api/get-candidate-by-JobId";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "@/components/candidate/candidate-card/candidate-card-info";
import { useState } from "react";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";

const InviteAcceptedCadidatesTabAdmin = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const jobId = router.query.id as string;

  const {
    data,
    isLoading: isAdminDataLoading,
    isError: isAdminDataError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCandidatesByJobIdAndStages({
    stage: "inviteAccepted",
    jobId,
  });

  const { ref } = useFetchNextListOnView({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
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

  const inviteAcceptedCandidatesAdmin = data.pages.flatMap((pg) => pg.data);
  return (
    <>
      <div className="scroll-container h-[calc(100vh-118px)] space-y-2 overflow-auto">
        {inviteAcceptedCandidatesAdmin?.length === 0 ? (
          <h1 className="mt-8 text-center text-xl text-brand-blue">
            No candidates to show
          </h1>
        ) : (
          inviteAcceptedCandidatesAdmin?.map(
            (candidate: JobApplicationSchema, i) => (
              <Card
                ref={
                  inviteAcceptedCandidatesAdmin.length === i + 1 ? ref : null
                }
                key={candidate._id}
                className="relative flex gap-[18px] p-4"
              >
                <CandidateCardAvatar
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
                />
                <div className="flex grow justify-between gap-[18px]">
                  <div className="w-3/5 space-y-1">
                    <CandidateCardInfo candidate={candidate.candidate} />
                  </div>
                  <div className="flex w-2/5 flex-col justify-between">
                    {candidate?.questionsAndAnswers?.length > 0 && (
                      <div
                        className="flex cursor-pointer items-center justify-between rounded-lg
                     border border-[#E8E9FF] bg-background px-4 py-3 text-sm font-medium text-brand-black"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <p className="w-1/2">View screening question answers</p>
                        <ChevronRight color="#444BAB" size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ),
          )
        )}
      </div>
      <InviteAcceptedResponse
        isOpen={isOpen}
        setOpen={setOpen}
        data={inviteAcceptedCandidatesAdmin}
      />
    </>
  );
};

export default InviteAcceptedCadidatesTabAdmin;

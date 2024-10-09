import { Card } from "@/components/ui/card";
import useGetJobApplicationByRecruiter from "@/features/jobs/api/get-job-application-by-recruiter";
import { useRouter } from "next/router";
import CandidateCardAvatar from "../../../../candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "../../../../candidate/candidate-card/candidate-card-info";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import InterviewScheduleContainer from "./interview-schedule-container";
import InterviewScheduleForm from "./interview-schedule-form";
import InviteAcceptedResponse from "@/components/job/job-postings/invite-accepted-response";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { useState } from "react";
import RejectJobApplication from "@/features/jobs/reject-job-application";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";

interface InviteAcceptedCadidatesTabProps {
  Interface?: string;
}

const InviteAcceptedCadidatesTab = ({
  Interface,
}: InviteAcceptedCadidatesTabProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isInterviewScheduleDialogOpen, setIsInterviewScheduleDialogOpen] =
    useState<any>({
      isOPen: false,
      candidate: "null",
    });
  const router = useRouter();
  const jobId = router.query.id as string;
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetJobApplicationByRecruiter({
    stage: "inviteAccepted",
    jobId,
  });

  const { ref } = useFetchNextListOnView<
    ResponseWithPagination<JobApplicationSchema[]>
  >({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading)
    return (
      <div className="scroll-container mt-6 h-[calc(100vh-150px)] overflow-auto">
        {[...Array(3)].map(() => (
          <div key={crypto.randomUUID()} className="mb-2">
            <InfoCardSkeleton />
          </div>
        ))}
        ;
      </div>
    );

  if (isError) {
    console.log(error);
    return <h1>error</h1>;
  }
  const inviteAcceptedCandidates = data.pages.flatMap((pg) => pg.data);

  return (
    <>
      <div className="scroll-container h-[calc(100vh-118px)] space-y-2 overflow-auto ">
        {inviteAcceptedCandidates?.length === 0 ? (
          <h1 className="mt-8 text-center text-xl text-brand-blue">
            No candidates to show
          </h1>
        ) : (
          inviteAcceptedCandidates?.map(
            (candidate: JobApplicationSchema, i) => (
              <Card
                ref={inviteAcceptedCandidates.length === i + 1 ? ref : null}
                key={candidate._id}
                className={`relative flex gap-[18px] p-4  ${candidate.candidate.hired && "bg-[#E1E1E1]"}`}
              >
                <div className="flex w-full flex-col justify-between  gap-[16px] md:flex-row">
                  <CandidateCardAvatar
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
                  />
                  <div className="flex grow justify-between gap-[18px] md:pl-5 ">
                    <div className="space-y-1 md:w-3/5">
                      <CandidateCardInfo candidate={candidate.candidate} />
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex w-full flex-col justify-between md:w-2/5">
                    {candidate?.questionsAndAnswers?.length > 0 && (
                      <div
                        className={`flex ${candidate.candidate.hired ? "cursor-not-allowed" : "cursor-pointer"}  items-center justify-between rounded-lg
                     border border-[#E8E9FF] bg-background px-4 py-3 text-sm font-medium text-brand-black`}
                        onClick={() => {
                          if (!candidate.candidate.hired) setOpen(true);
                        }}
                      >
                        <p className="w-1/2">View screening question answers</p>
                        <ChevronRight color="#444BAB" size={16} />
                      </div>
                    )}

                    <div className=" bottom-4 items-center md:self-end">
                      <div className="mt-[20px] flex items-center  gap-2 md:mt-0">
                        <RejectJobApplication
                          jobId={candidate._id}
                          candidateName={candidate.candidate.fullName}
                          disabled={candidate.candidate.hired}
                          className="w-full md:w-[100px]"
                        />

                        <Button
                          onClick={() => {
                            setIsInterviewScheduleDialogOpen({
                              isOPen: true,
                              candidate: candidate,
                            });
                          }}
                          variant="success"
                          disabled={candidate.candidate.hired}
                          className="w-full min-w-[180px] grow font-bold md:w-[180px]"
                        >
                          Proceed to interview
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ),
          )
        )}
      </div>
      {isInterviewScheduleDialogOpen.candidate && (
        <Dialog
          open={isInterviewScheduleDialogOpen.isOPen}
          onOpenChange={(open) => {
            if (!open)
              setIsInterviewScheduleDialogOpen({
                isOPen: false,
                candidate: null,
              });
          }}
        >
          {/* <DialogTrigger>
          <Button variant="success" className="grow font-bold">
            Proceed to interview
          </Button>
        </DialogTrigger> */}
          <DialogContent className="px-7 py-6 md:w-auto md:max-w-none">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Set interview schedule
              </DialogTitle>
            </DialogHeader>
            {/* <InterviewScheduleContainer> */}
            <InterviewScheduleForm
              candidateInfo={isInterviewScheduleDialogOpen.candidate}
              jobApplicationId={isInterviewScheduleDialogOpen.candidate._id}
              setIsFormOpen={(value) => {
                if (!value)
                  setIsInterviewScheduleDialogOpen({
                    isOPen: false,
                    candidate: null,
                  });
              }}
            />
            {/* </InterviewScheduleContainer> */}
          </DialogContent>
        </Dialog>
      )}
      <InviteAcceptedResponse
        isOpen={isOpen}
        setOpen={setOpen}
        data={inviteAcceptedCandidates}
      />
    </>
  );
};

export default InviteAcceptedCadidatesTab;

import { Card } from "@/components/ui/card";
import CandidateCardAvatar from "../../../candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "../../../candidate/candidate-card/candidate-card-info";
import useGetJobApplicationByRecruiter from "@/features/jobs/api/get-job-application-by-recruiter";
import { useRouter } from "next/router";
import OfferedStatus from "@/components/svg/offered-status";
import {
  ApprovalStatus,
  JobApplicationSchema,
} from "@/features/jobs/schema/job-application-schema";
import AcceptColorButton from "@/features/interview/candidate/components/interview-buttons/accept-color-button";
import { Button } from "@/components/ui/button";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";

interface ApprovalChecks {
  candidate: ApprovalStatus;
  recruiter: ApprovalStatus;
  admin: ApprovalStatus;
}

const OfferedCandidatesTab = ({
  isHireable = true,
}: {
  isHireable?: boolean;
}) => {
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
    stage: "offered",
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

  const offeredCandiates = data.pages.flatMap((pg) => pg.data);

  const handleStatus = (status: ApprovalChecks) => {
    const statusConfig: Record<
      keyof ApprovalChecks,
      {
        label: string;
        getColor: () => "#171717" | "#A9A9A9" | "#E72F2F" | "";
        getText: () =>
          | "rejected"
          | ""
          | "Confirmed"
          | "Confirmation pending"
          | "accepted"
          | "Acceptance pending";
      }
    > = {
      recruiter: {
        label: "Offered",
        getColor: () => "#171717",
        getText: () => "",
      },
      candidate: {
        label: "Candidate",
        getColor: () => {
          switch (status.candidate) {
            case "approved":
              return "#171717";
            case "pending":
              return "#A9A9A9";
            case "rejected":
              return "#E72F2F";
            default:
              return "";
          }
        },
        getText: () => {
          switch (status.candidate) {
            case "approved":
              return "accepted";
            case "pending":
              return "Acceptance pending";
            case "rejected":
              return "rejected";
            default:
              return "";
          }
        },
      },
      admin: {
        label: "Consultant",
        getColor: () => {
          switch (status.admin) {
            case "approved":
              return "#171717";
            case "pending":
              return "#A9A9A9";
            case "rejected":
              return "#E72F2F";
            default:
              return "";
          }
        },
        getText: () => {
          switch (status.admin) {
            case "approved":
              return "Confirmed";
            case "pending":
              return "Confirmation pending";
            case "rejected":
              return "rejected";
            default:
              return "";
          }
        },
      },
    };

    return (
      <div className="flex flex-col gap-4">
        {Object.keys(statusConfig).map((key) => (
          <div className="flex items-center" key={key}>
            <OfferedStatus status={status[key as keyof ApprovalChecks]} />
            <p
              className={`text-sm font-medium text-[${statusConfig[
                key as keyof ApprovalChecks
              ].getColor()}]`}
            >
              {statusConfig[key as keyof ApprovalChecks].label}{" "}
              {statusConfig[key as keyof ApprovalChecks].getText()}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="scroll-container h-[calc(100vh-118px)] space-y-2 overflow-auto">
      {offeredCandiates?.length === 0 ? (
        <h1 className="mt-8 text-center text-xl text-brand-blue">
          No candidates to show
        </h1>
      ) : (
        offeredCandiates?.map((candidate, i) => (
          <Card
            key={candidate._id}
            ref={offeredCandiates.length === i + 1 ? ref : null}
            className="flex flex-col gap-[18px] p-4 md:flex-row"
          >
            <CandidateCardAvatar
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
              className="h-[97px] w-[97px]"
            />
            <div className="flex grow flex-col justify-between md:flex-row md:whitespace-nowrap">
              <div className="w-full">
                <CandidateCardInfo candidate={candidate.candidate} />
              </div>
              <div className="flex flex-col gap-1.5 pt-[20px] md:self-end md:pt-0">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {handleStatus(candidate?.approvalChecks)}
                </div>
                {/* hire / reject  */}
                {isHireable && (
                  <div className="flex flex-col gap-[13px] pl-[18px]">
                    <p className="text-sm font-medium leading-6 text-[#5E5E5E]">
                      Confirm whether to hire or reject this candidate.
                    </p>
                    <div className="flex gap-3 self-end">
                      <AcceptColorButton
                        title={" Hire "}
                        disabled={candidate.candidate.hired}
                        onClick={() => {}}
                        className="w-[70px]"
                      />
                      <Button
                        disabled={candidate.candidate.hired}
                        variant={"reject"}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default OfferedCandidatesTab;

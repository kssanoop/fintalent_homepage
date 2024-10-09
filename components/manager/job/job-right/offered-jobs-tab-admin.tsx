import { Card } from "@/components/ui/card";
import CandidateCardAvatar from "../../../candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "../../../candidate/candidate-card/candidate-card-info";
import OfferedStatus from "@/components/svg/offered-status";
import {
  ApprovalStatus,
  JobApplicationSchema,
} from "@/features/jobs/schema/job-application-schema";
import { useRouter } from "next/router";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import { useGetCandidatesByStagesForManager } from "@/features/jobs/manager/api/get-candidates-by-stages-for-manager";

interface ApprovalChecks {
  candidate: ApprovalStatus;
  recruiter: ApprovalStatus;
  admin: ApprovalStatus;
}

const OfferedCandidatesTabAdmin = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const {
    data: offeredCandiatesAdmin,
    isLoading: isAdminDataLoading,
    isError: isAdminDataError,
    error,
  } = useGetCandidatesByStagesForManager({
    stage: "offered",
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
      {offeredCandiatesAdmin?.length === 0 ? (
        <h1 className="mt-8 text-center text-xl text-brand-blue">
          No candidates to show
        </h1>
      ) : (
        offeredCandiatesAdmin?.map((candidate: JobApplicationSchema) => (
          <Card key={crypto.randomUUID()} className="flex gap-[18px] p-4">
            <CandidateCardAvatar
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
              className="h-[97px] w-[97px]"
            />
            <div className="flex grow justify-between md:whitespace-nowrap">
              <div className="w-full">
                <CandidateCardInfo candidate={candidate.candidate} />
              </div>
              <div className="flex flex-col gap-1.5 self-end">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {handleStatus(candidate?.approvalChecks)}
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default OfferedCandidatesTabAdmin;

import { Card } from "@/components/ui/card";
import CandidateCardAvatar from "../../../candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "../../../candidate/candidate-card/candidate-card-info";
import { useRouter } from "next/router";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import OfferedStatus from "@/components/svg/offered-status";
import {
  ApprovalStatus,
  JobApplicationSchema,
} from "@/features/jobs/schema/job-application-schema";
import { Button } from "@/components/ui/button";
import { useGetCandidatesByStagesForTeamLead } from "@/features/jobs/team-lead/api/get-candidates-by-stages-for-team-lead";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import useAcceptOrRejectJobOfferWithCtc from "@/features/jobs/api/accept-or-reject-job-offer";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ApprovalChecks {
  candidate: ApprovalStatus;
  recruiter: ApprovalStatus;
  admin: ApprovalStatus;
}

type HireOrReject = "accept" | "reject";

const HireOrRejectWithCTC = ({
  jobApplicationId,
}: {
  jobApplicationId: string;
}) => {
  const queryClient = useQueryClient();
  const [ctc, setCtc] = useState("");
  const [selectedAction, setSelectedAction] = useState<
    "accept" | "reject" | ""
  >("");

  const handleSucess = () => {
    queryClient.invalidateQueries({ queryKey: ["get-candidates-by-jobId"] });
  };

  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const { mutate: hireOrReject, isLoading } = useAcceptOrRejectJobOfferWithCtc(
    handleSucess,
    handleError,
  );

  const handleAction = (action: HireOrReject) => {
    if (ctc === "" && action === "accept") {
      toast.error("Please enter CTC");
      return;
    }
    hireOrReject({
      action,
      ctc,
      jobApplicationId,
    });
  };
  return (
    <div className="flex flex-col gap-0.5">
      <p className="mb-1 text-xs font-semibold text-[#171717]">Enter CTC</p>
      <div className="flex gap-3 self-end">
        <Input
          required
          className="h-[38.5px]"
          type="number"
          min="0"
          value={ctc}
          onChange={(e) => {
            const enteredValue = e.target.value;
            if (!/^[1-9]\d*$/.test(enteredValue) && enteredValue) {
              setCtc("");
              toast.error("Please enter a positive integer.");
              return;
            }
            setCtc(enteredValue);
          }}
        />
        <Button
          variant={"success"}
          className="w-[70px]"
          type="submit"
          disabled={isLoading}
          onClick={() => {
            setSelectedAction("accept");
            handleAction("accept");
          }}
        >
          {isLoading && selectedAction === "accept" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Hiring...
            </>
          ) : (
            "Hire"
          )}
        </Button>
        <Button
          variant={"reject"}
          type="button"
          onClick={() => {
            setSelectedAction("reject");
            handleAction("reject");
          }}
          disabled={isLoading}
        >
          {isLoading && selectedAction === "reject" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Rejecting...
            </>
          ) : (
            "Reject"
          )}
        </Button>
      </div>
    </div>
  );
};

const OfferedCandidatesTabTeamLead = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const {
    data: offeredCandiates,
    isLoading,
    isError,
    error,
  } = useGetCandidatesByStagesForTeamLead({
    stage: "offered",
    jobId,
  });

  if (isLoading)
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
  if (isError) {
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
      {offeredCandiates?.length === 0 ? (
        <h1 className="mt-8 text-center text-xl text-brand-blue">
          No candidates to show
        </h1>
      ) : (
        offeredCandiates?.map((candidate: JobApplicationSchema) => (
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
                {/* hire / reject  */}
                <div className="flex flex-col gap-[13px] pl-[18px]">
                  <p className="text-sm font-medium leading-6 text-[#5E5E5E]">
                    Confirm whether to hire or reject this candidate.
                  </p>
                  <div className="flex gap-3 self-end">
                    {candidate.approvalChecks.admin !== "approved" && (
                      <HireOrRejectWithCTC jobApplicationId={candidate._id} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default OfferedCandidatesTabTeamLead;

import React, { useState } from "react";
import PropTypes from "prop-types";
import OfferedStatus from "@/components/svg/offered-status";
import { ApprovalChecks } from "../../jobs/job-right-admin/offered-jobs-tab-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { toast } from "sonner";
import { useJobOfferAction } from "@/features/jobs/admin/api/accept-reject-job-offer";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const stages = [
  { id: 1, label: "Invited" },
  { id: 2, label: "Invite Accepted" },
  { id: 3, label: "Inter View Scheduled" },
  { id: 4, label: "Shortlisted" },
  { id: 5, label: "Offered" },
  { id: 6, label: "Hired/Rejected" },
];

interface VerticalProgressBarProps {
  currentStage: string;
  jobDetails: JobApplicationSchema;
}

const VerticalProgressBar = ({
  currentStage,
  jobDetails,
}: VerticalProgressBarProps) => {
  // const candidateId = "615a2d2a4b4f4d0017a3f1f7";
  const [ctc, setCtc] = useState("");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedAction, setSelectedAction] = useState("");
  const queryClient = useQueryClient();
  const handleSuccess = (response: any) => {
    queryClient.invalidateQueries({
      queryKey: ["get-jobs-assigned"],
    });
    toast.success(response?.message);
  };

  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const {
    mutate: hireOrReject,
    isLoading,
    isError,
  } = useJobOfferAction(handleSuccess, handleError);

  const handleAction = (action: string, jobApplicationId: string) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [jobApplicationId]: true,
    }));
    hireOrReject({
      action,
      data: { approvedCTC: ctc },
      jobApplicationId,
    });
    setCtc("");
  };
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
        label: "Recruiter Offered",
        getColor: () => "#171717",
        getText: () => "",
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
    };

    const renderConfirmationText = () => {
      if (
        status.admin === "pending" &&
        status.recruiter === "approved" &&
        status.candidate !== "rejected"
      ) {
        return (
          <div className="flex w-full flex-col gap-[13px]">
            <p className="text-sm font-medium leading-6 text-[#5E5E5E]">
              Confirm whether to hire or reject this candidate.
            </p>
            <div className="-ml-5 flex gap-x-5 lg:gap-x-32">
              <div className="flex items-end justify-between gap-x-14">
                <div className="flex flex-col gap-0.5">
                  <Input
                    className="h-9 text-sm font-semibold text-black lg:w-[257px]"
                    placeholder="Enter CTC"
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
                </div>
                <div className="flex gap-3">
                  {isLoading &&
                  !isError &&
                  loadingStates[jobDetails?.jobId?._id] &&
                  selectedAction === "accept" ? (
                    <Button variant={"success"} className="w-[100px]">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Hiring..
                    </Button>
                  ) : (
                    <Button
                      variant={"success"}
                      className="w-[100px]"
                      onClick={() => {
                        setSelectedAction("accept");
                        handleAction("accept", jobDetails?._id);
                      }}
                    >
                      Hire
                    </Button>
                  )}
                  {isLoading &&
                  !isError &&
                  selectedAction === "reject" &&
                  loadingStates[jobDetails?.jobId?._id] ? (
                    <Button variant={"reject"} className="w-[85px]">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Rejecting..
                    </Button>
                  ) : (
                    <Button
                      variant={"reject"}
                      className="w-[85px]"
                      onClick={() => {
                        setSelectedAction("reject");
                        handleAction("reject", jobDetails?._id);
                      }}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }
      return null;
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
              {statusConfig[key as keyof ApprovalChecks].label ===
                "Consultant" &&
                statusConfig[key as keyof ApprovalChecks].getText() ===
                  "Confirmation pending" &&
                renderConfirmationText()}
            </p>
          </div>
        ))}
      </div>
    );
  };
  console.log("jobs data received:", jobDetails);
  const getClassName = (stageId: number) => {
    const currentIndex = stages.findIndex(
      (stage) => stage.label === currentStage,
    );

    // console.log("current index:", currentIndex)

    if (stageId < currentIndex + 1) {
      return "is-done";
    } else if (stageId === currentIndex + 1) {
      return "current";
    } else if (currentStage === "Hired" || currentStage === "Rejected") {
      return "is-done";
    } else {
      return "";
    }
  };

  const isHired = currentStage === "Hired";
  const isRejected = currentStage === "Rejected";

  return (
    <div className="ml-2.5">
      <div className="wrapper">
        <ul className="StepProgress">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`StepProgress-item ${getClassName(stage.id)}`}
            >
              <div className="flex flex-col">
                {stage?.id === 6 && isHired
                  ? "Hired"
                  : stage?.id === 6 && isRejected
                  ? "Rejected"
                  : stage.label}
                {currentStage === "Offered" && stage.id === 5 && (
                  <div className="flex flex-col pt-4">
                    {handleStatus(jobDetails?.approvalChecks)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

VerticalProgressBar.propTypes = {
  currentStage: PropTypes.string.isRequired,
};

export default VerticalProgressBar;

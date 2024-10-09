import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "@/components/candidate/candidate-card/candidate-card-info";
import { Card } from "@/components/ui/card";
import React from "react";
// import { demoJobApplication } from "../../jobs/job-right-admin/invitedCandidatesTab";
import AcceptButton from "../../common/accept-button";
import RejectButton from "../../common/reject-button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useGetCandidatesForReopenRequest } from "@/features/get-candidates/admin/api/get-candidates-for-reopen-request";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import useApproveOrRejectCandidate from "@/features/get-candidates/admin/api/approve-or-reject-candidate";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useRejectCandidate from "@/features/get-candidates/admin/api/reject-candidate";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ReopenRequestTabAdmin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } =
    useGetCandidatesForReopenRequest();
  // console.log(" Candidates:", data);

  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({
      queryKey: ["candidates-for-reopen-request"],
    });
    queryClient.invalidateQueries({
      queryKey: ["get-candidate-by-id"],
    });
    toast.success(data?.message);
  };

  // console.log("data received:", candidateId);

  const handleError = (err: any) => {
    toast.success(err?.response?.data?.message);
  };

  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useApproveOrRejectCandidate(handleSuccess, handleError);

  const {
    mutate: reject,
    isLoading: isRejecting,
    isError: isRejectError,
  } = useRejectCandidate(handleSuccess, handleError);

  const handleAction = ({
    candidateId,
    action,
  }: {
    candidateId: string;
    action: "approve" | "reject";
  }) => {
    mutate({ candidateId, action });
  };
  if (isError) {
    return <div>{error as string}</div>;
  }

  const handleRedirect = (candidateId: string) => {
    router.push(`${pathname}/${candidateId}?source=reopen`);
  };
  return (
    <div className="flex flex-col gap-2.5 pl-5">
      {isLoading && (
        <>
          {[...Array(3)].map(() => (
            <InfoCardSkeleton key={crypto.randomUUID()} />
          ))}
        </>
      )}

      {data?.length === 0 ? (
        <p className="text-center text-lg text-brand-blue">
          No candidates found
        </p>
      ) : (
        data?.map((candidate: CandidateSchema) => (
          <Card
            key={crypto.randomUUID()}
            className="relative flex cursor-pointer gap-[18px] px-[19px] py-5"
          >
            <div
              onClick={() => {
                handleRedirect(candidate?.candidateId);
              }}
            >
              <CandidateCardAvatar
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate?.profilePhoto?.storageName}`}
              />
            </div>

            <div className="flex grow justify-between gap-[18px]">
              <div
                className="w-3/5 space-y-1"
                onClick={() => {
                  handleRedirect(candidate?.candidateId);
                }}
              >
                <CandidateCardInfo candidate={candidate} />
              </div>
              {/* buttons */}
              <div className="flex items-end justify-end gap-4">
                {isSubmitting && !isSubmitionError ? (
                  <Button variant={"success"}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Approving...
                  </Button>
                ) : (
                  <AcceptButton
                    text="Approve"
                    onClick={() => {
                      handleAction({
                        candidateId: candidate?.candidateId,
                        action: "approve",
                      });
                    }}
                  />
                )}

                {isRejecting && !isRejectError ? (
                  <Button variant={"reject"}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rejecting...
                  </Button>
                ) : (
                  <RejectButton
                    text="Reject"
                    onClick={() => {
                      reject({
                        candidateId: candidate?.candidateId,
                        action: "reject",
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReopenRequestTabAdmin;

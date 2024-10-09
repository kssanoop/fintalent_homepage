import ProfileLeft from "@/components/candidate/profile/body/profile-left";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CandidatesProfileTabsAdmin from "./candidate-profile-tab-admin";
import { Card } from "@/components/ui/card";
import { personalDetails } from "@/features/ProfileEdit/UserDetails/Schema/profile-schema";
import { useQueryClient } from "@tanstack/react-query";
import useApproveOrRejectCandidate from "@/features/get-candidates/admin/api/approve-or-reject-candidate";
import useRejectCandidate from "@/features/get-candidates/admin/api/reject-candidate";
import { Button } from "@/components/ui/button";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";

interface CandidateProfileBodyProps {
  data: personalDetails;
  isLoading: boolean;
}

const CandidateProfileBody = ({
  data,
  isLoading,
}: CandidateProfileBodyProps) => {
  const { role } = useGetInfoFromCookie();
  const [showToggleSwitch, setShowToggleSwitch] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { source } = router.query;
  const candidateId = router.query?.candidateId as string;

  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({
      queryKey: ["candidates-for-reopen-request"],
    });
    queryClient.invalidateQueries({
      queryKey: ["get-candidate-by-id"],
    });
    toast.success(data?.message);
  };

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

  useEffect(() => {
    if (source === "all" || source === "reopen") {
      setShowToggleSwitch(true);
    } else {
      setShowToggleSwitch(false);
    }
  }, [source]);

  const personalDetails: personalDetails = data;
  return (
    <div className="flex h-full flex-col px-5 md:flex-row md:gap-4 md:overflow-auto md:px-0">
      <div
        className={`${
          source === "reopen" ? "mt-3" : "mt-[27px]"
        } h-full md:w-[24%] md:min-w-[340px] md:pl-5`}
      >
        <ProfileLeft
          data={personalDetails}
          Interface={role}
          showToggleSwitch={showToggleSwitch}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-3 flex w-full flex-col gap-2">
        {source === "reopen" && personalDetails?.reopenRequest && (
          <Card className="mr-5 flex justify-between border border-solid border-[#034A9A] bg-[#034A9A1F] px-5 py-4 lg:mr-5">
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-[#171717]">
                Account Reopen Request
              </p>
              <p className="text-sm font-normal text-[#5E5E5E]">
                The candidate has requested to make their profile open to
                hiring.
              </p>
            </div>
            <div className="flex justify-end gap-4 self-end">
              {isSubmitting && !isSubmitionError ? (
                <Button
                  variant={"success"}
                  className="flex items-center gap-2.5 bg-[#5ED678] text-sm font-bold"
                  disabled
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Approving..
                </Button>
              ) : (
                <Button
                  variant={"success"}
                  className="flex items-center gap-2.5 bg-[#5ED678] text-sm font-bold"
                  onClick={() => {
                    mutate({
                      action: "approve",
                      candidateId: candidateId ?? "",
                    });
                  }}
                >
                  <div>Approve</div>
                  <Check color="#FFF" width={18} height={18} />
                </Button>
              )}

              {isRejecting && !isRejectError ? (
                <Button
                  variant={"secondary"}
                  className="flex items-center gap-2.5 bg-[#ED6464]  text-sm font-bold"
                  disabled
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Rejecting..
                </Button>
              ) : (
                <Button
                  variant={"secondary"}
                  className="flex items-center gap-2.5 bg-[#ED6464]  text-sm font-bold"
                  onClick={() => {
                    reject({
                      candidateId: candidateId ?? "",
                      action: "reject",
                    });
                  }}
                >
                  <div>Reject</div>
                  <X color="#FFF" width={18} height={18} />
                </Button>
              )}
            </div>
          </Card>
        )}
        <DynamicHeightContainer>
          <div className="scroll-container hide-scrollbar h-[calc(100%-8px)] md:overflow-auto md:pr-5">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <CandidatesProfileTabsAdmin data={data} />
            )}
          </div>
        </DynamicHeightContainer>
      </div>
    </div>
  );
};

export default CandidateProfileBody;

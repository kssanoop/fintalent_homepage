import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRejectJobOffer } from "./api/rejectJobOffer";

interface AcceptInvitePopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId: string;
  companyName: string;
  jobTitle: string;
}
const RejectJobOfferPopup = ({
  open,
  setOpen,
  jobId,
  jobTitle,
  companyName,
}: AcceptInvitePopupProps) => {
  const queryClient = useQueryClient();
  function handleSuccessAnswer(data: any) {
    queryClient.invalidateQueries({ queryKey: ["getallCandidateJobs"] });
    queryClient.invalidateQueries({ queryKey: ["getCandidateJobs"] });
    queryClient.invalidateQueries({ queryKey: ["getallCandidateJobslength"] });
    setOpen(false);
    toast.success(data?.message);
  }

  function handleErrorAnswer(error: any) {
    toast.error(error?.response?.data?.message);
  }

  const {
    mutate: mutateRejectjobOffer,
    isLoading: isSubmitting,
    isError: isSubmittingError,
  } = useRejectJobOffer(handleSuccessAnswer, handleErrorAnswer, jobId);

  const handleAcceptInvite = () => {
    if (jobId) {
      mutateRejectjobOffer();
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent className="">
        <div className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle className="text-start text-lg font-bold">
              Do you want to Reject this offer?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="text-base font-medium leading-6 text-[#5E5E5E]">
              Doing this means that you reject your job offer at
              <br />
              <span className="text-[#171717]">{companyName}</span> as{" "}
              <span className="text-[#171717]">{jobTitle}.</span>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end gap-[10px] pt-1">
              <Button
                variant={"outline"}
                className="border border-[#CDCDCD] bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                No
              </Button>
              {isSubmitting && !isSubmittingError ? (
                <Button
                  className="min-w-[100px] border border-border bg-[#E72F2F] text-base font-bold"
                  variant={"secondary"}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </Button>
              ) : (
                <Button
                  className="min-w-[100px] border border-border bg-[#E72F2F] text-base font-bold "
                  variant={"secondary"}
                  onClick={handleAcceptInvite}
                >
                  Reject
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectJobOfferPopup;

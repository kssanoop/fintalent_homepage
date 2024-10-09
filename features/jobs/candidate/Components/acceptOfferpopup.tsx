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
import { useAcceptJobOffer } from "./api/acceptOffer";

interface AcceptInvitePopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId: string;
  companyName: string;
  jobTitle: string;
}
const AcceptofferPopup = ({
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
    mutate: mutateAcceptjobOffer,
    isLoading: isSubmitting,
    isError: isSubmittingError,
  } = useAcceptJobOffer(handleSuccessAnswer, handleErrorAnswer, jobId);

  const handleAcceptInvite = () => {
    if (jobId) {
      mutateAcceptjobOffer();
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
              Do you want to accept this offer?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="text-base font-medium leading-6 text-[#5E5E5E]">
              Accepting this offer means that you agree to work at
              <br />
              <span className="text-[#171717]">{companyName}</span> as{" "}
              <span className="text-[#171717]">{jobTitle}.</span>
            </div>
            <ul className="flex flex-col gap-3 pl-6 text-base font-medium leading-6">
              <li className="list-disc text-[#5E5E5E]">
                Recruiters will no longer be able to discover your profile for
                other jobs.{" "}
              </li>
              <li className="list-disc text-[#5E5E5E]">
                You cannot accept any other job offers.
              </li>
            </ul>
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
                  className="min-w-[100px] border border-border text-base font-bold"
                  variant={"success"}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Accepting...
                </Button>
              ) : (
                <Button
                  className="min-w-[100px] border border-border text-base font-bold"
                  variant={"success"}
                  onClick={handleAcceptInvite}
                >
                  Accept offer
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptofferPopup;

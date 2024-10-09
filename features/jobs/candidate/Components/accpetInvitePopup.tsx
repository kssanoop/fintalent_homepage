import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { Dispatch, SetStateAction } from "react";
import { usePostAnswer } from "./api/useSendAnswer";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface AcceptInvitePopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId: string;
}
const AcceptInvitePopup = ({
  open,
  setOpen,
  jobId,
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
    mutate: mutateAcceptInvite,
    isLoading: isSubmitting,
    isError: isSubmittingError,
  } = usePostAnswer(handleSuccessAnswer, handleErrorAnswer, jobId);

  const handleAcceptInvite = () => {
    if (jobId) {
      mutateAcceptInvite([]);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 px-8 py-6">
          <DialogHeader>
            <DialogTitle className="text-start text-lg font-bold">
              Do you want to accept this invite?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end gap-[10px]">
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
                  Accept invite
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptInvitePopup;

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePendingCandidatesAction } from "@/features/admin/candidate/api/approve-reject-pending-candidates";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface RejectPopupDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  candidateId?: string;
  heading: string;
  descrption: string;
}

const RejectPopupDialog = ({
  open,
  setOpen,
  candidateId = "",
  heading,
  descrption,
}: RejectPopupDialogProps) => {
  const handleSuccess = (data: any) => {
    toast.success(data?.message);
  };

  const handleError = (err: any) => {
    toast.success(err?.response?.data?.message);
  };

  const {
    mutate: actionCandidate,
    isLoading: isActionLoading,
    isError: isActionError,
  } = usePendingCandidatesAction(handleSuccess, handleError);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-8 px-8 py-6">
          <DialogHeader>
            <div className="flex flex-col gap-3  text-base font-medium">
              <DialogTitle className="text-[#171717]">{heading}</DialogTitle>
              <DialogDescription className="text-[#5E5E5E]">
                {descrption}
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter>
            <div className="flex gap-2.5">
              <Button
                variant={"outline"}
                className="border border-[#CDCDCD] bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                No
              </Button>
              {isActionLoading && !isActionError ? (
                <Button
                  className=" bg-[#E72F2F] text-base font-semibold"
                  variant={"secondary"}
                >
                  Rejecting
                </Button>
              ) : (
                <Button
                  className=" bg-[#E72F2F] text-base font-semibold"
                  variant={"secondary"}
                  onClick={() => {
                    actionCandidate({
                      candidateId,
                      action: "reject",
                    });
                  }}
                >
                  Yes, Reject
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectPopupDialog;

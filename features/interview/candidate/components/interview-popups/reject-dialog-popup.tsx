import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import CancelButton from "../interview-buttons/cancel-button";
import RejectColorButton from "../interview-buttons/reject-color-button";
import { useInterviewRequestAction } from "@/features/interview/api/interview-request-action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
interface RejectDialogPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  companyName: string;
  JobTitle: string;
  InterviewId: string;
}

const RejectDialogPopup = ({
  open,
  setOpen,
  InterviewId,
  companyName,
  JobTitle,
}: RejectDialogPopupProps) => {
  const queryClient = useQueryClient();

  // handle action success
  function handleSuccess(data: any) {
    queryClient.invalidateQueries({ queryKey: ["get-interview-requests"] });
    queryClient.invalidateQueries({ queryKey: ["get-interview-upcoming"] });
    toast.success(data?.message);
  }
  function handleError(error: any) {
    toast.error(error?.response?.data?.message);
  }

  const {
    mutate: mutateReject,
    isLoading: isSubmitting,
    isError: isSubmittingError,
  } = useInterviewRequestAction(
    handleSuccess,
    handleError,
    InterviewId,
    "reject",
  );

  const handleReject = () => {
    mutateReject();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 px-8 py-6">
          <DialogHeader className="flex flex-col gap-6">
            <DialogTitle className="text-start leading-normal">
              Do you want to Decline this <br className="block md:hidden" />
              invite?
            </DialogTitle>
            <DialogDescription className="p-0">
              <div className=" text-start">
                Doing this means that you reject your interview invite for the
                role of <span className="text-[#171717]">{JobTitle}</span> at{" "}
                <span className="text-[#171717]">{companyName}</span>.
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end gap-[10px]">
              <CancelButton
                title={"No"}
                onClick={() => {
                  setOpen(false);
                }}
              />
              {isSubmitting && !isSubmittingError ? (
                <RejectColorButton title={"Declining..."}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </RejectColorButton>
              ) : (
                <RejectColorButton
                  title={"Yes, Decline"}
                  onClick={() => {
                    handleReject();
                  }}
                />
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialogPopup;

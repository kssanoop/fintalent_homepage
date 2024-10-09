import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import AcceptColorButton from "../interview-buttons/accept-color-button";
import CancelButton from "../interview-buttons/cancel-button";
import { useInterviewRequestAction } from "@/features/interview/api/interview-request-action";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AcceptDialogPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  companyName: string;
  JobTitle: string;
  InterviewId: string;
}

const AcceptDialogPopup = ({
  open,
  setOpen,
  companyName,
  JobTitle,
  InterviewId,
}: AcceptDialogPopupProps) => {
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
    mutate: mutateAccept,
    isLoading: isSubitting,
    isError: isSubmitError,
  } = useInterviewRequestAction(
    handleSuccess,
    handleError,
    InterviewId,
    "approve",
  );

  const handleAccept = () => {
    mutateAccept();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 px-8 py-6">
          <DialogHeader className="flex flex-col gap-6">
            <DialogTitle className="text-start leading-normal">
              Do you want to accept this <br className="block md:hidden" />{" "}
              invite?
            </DialogTitle>
            <DialogDescription className="m-0 p-0">
              <div className="text-start text-base font-medium text-[#5E5E5E]">
                Accepting this offer means that you agree for an interview for
                the role of <span className="text-[#171717]">{JobTitle}</span>{" "}
                at <span className="text-[#171717]">{companyName}</span>.
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end gap-[10px]">
              <CancelButton
                title="No"
                onClick={() => {
                  setOpen(false);
                }}
              />
              {isSubitting && !isSubmitError ? (
                <AcceptColorButton title="Accepting...">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </AcceptColorButton>
              ) : (
                <AcceptColorButton
                  title={"Accept Invite"}
                  onClick={() => {
                    handleAccept();
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

export default AcceptDialogPopup;

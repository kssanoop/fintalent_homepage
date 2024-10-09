import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { useRejectJobInvite } from "./api/rejectJobInvite";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RejectJobPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId: string;
}

const RejectJobPopup = ({ open, setOpen, jobId }: RejectJobPopupProps) => {
  const queryClient = useQueryClient();
  function handleSuccessReject(data: any) {
    queryClient.invalidateQueries({ queryKey: ["getallCandidateJobs"] });
    queryClient.invalidateQueries({ queryKey: ["getCandidateJobs"] });
    queryClient.invalidateQueries({ queryKey: ["getallCandidateJobslength"] });
    setOpen(false);
    toast.success(data?.message);
  }

  function handleErrorReject(error: any) {
    toast.error(error?.response?.data?.message);
  }

  const {
    mutate: rejectMutate,
    isLoading,
    isError,
  } = useRejectJobInvite(handleSuccessReject, handleErrorReject, jobId);

  const handleRejectInvite = () => {
    if (jobId) {
      rejectMutate(jobId);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-start text-base font-medium text-[#171717]">
            Are you sure you want to decline this{" "}
            <br className="block md:hidden" /> Invite?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end gap-[10px]">
            <Button
              variant={"outline"}
              className="border border-border bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
            <div>
              {isLoading && !isError ? (
                <Button
                  className=" bg-[#E72F2F] text-base font-bold"
                  variant={"secondary"}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Declining...
                </Button>
              ) : (
                <Button
                  className=" bg-[#E72F2F] text-base font-bold"
                  variant={"secondary"}
                  onClick={handleRejectInvite}
                >
                  Yes, Decline
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectJobPopup;

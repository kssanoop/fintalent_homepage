import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAcceptJoinCompanyRequest } from "@/features/recuitment-partners/admin/api/accept-company-join-request";
import { useRejectJoinCompanyRequest } from "@/features/recuitment-partners/admin/api/reject-join-company-request";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface RejectPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  acceptClick: boolean;
  data: any;
}

const PendingRecruitersPopup = ({
  open,
  setOpen,
  data,
  acceptClick,
}: RejectPopupProps) => {
  console.log("data received in popup:", data);
  const { recruiterId } = data || {};

  const queryClient = useQueryClient();

  const formSubmissionhandleSuccess = (response: any) => {
    setOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["get-companies-all-pending-recruiter"],
    });
    queryClient.invalidateQueries({
      queryKey: ["get-companies-all-active-recruiter"],
    });
    toast.success(response?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const {
    mutate: acceptRecruiterRequest,
    isLoading: acceptingRecruiterRequest,
    isError: isacceptingRecruiterRequestError,
  } = useAcceptJoinCompanyRequest(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );

  const {
    mutate: rejectRecruiterRequest,
    isLoading: rejectingRecruiterRequest,
    isError: isrejectingRecruiterRequestError,
  } = useRejectJoinCompanyRequest(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent className="px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-start text-base font-medium text-[#171717]">
            Are you sure?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-base font-medium text-[#171717]">
          {!acceptClick
            ? `Doing this will remove this request from ${data?.fullName}.`
            : `Doing this will accept this request from ${data?.fullName}.`}
        </DialogDescription>
        <DialogFooter>
          {!acceptClick ? (
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
              {rejectingRecruiterRequest &&
              !isrejectingRecruiterRequestError ? (
                <Button
                  disabled
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
                  onClick={() => {
                    rejectRecruiterRequest(recruiterId);
                  }}
                >
                  Yes, Decline
                </Button>
              )}
            </div>
          ) : (
            <div className="flex justify-end gap-[10px]">
              <Button
                variant={"outline"}
                className="border border-border bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              {acceptingRecruiterRequest &&
              !isacceptingRecruiterRequestError ? (
                <Button
                  disabled
                  className=" bg-[#00BA70] text-base font-bold"
                  variant={"secondary"}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accepting...
                </Button>
              ) : (
                <Button
                  className=" bg-[#00BA70] text-base font-bold"
                  variant={"secondary"}
                  onClick={() => {
                    if (data) {
                      const {
                        profilePhoto,
                        email,
                        fullName,
                        designation,
                        phoneNo,
                        linkedIn,
                        location,
                      } = data;
                      acceptRecruiterRequest({
                        recruiterId,
                        data: {
                          profilePhoto,
                          email,
                          fullName,
                          designation,
                          phoneNo,
                          linkedIn,
                          location,
                        },
                      });
                    }
                  }}
                >
                  Accept
                </Button>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PendingRecruitersPopup;

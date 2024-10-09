import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { truncate } from "lodash";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

interface RescheduleDialogPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  recruiterName: string;
  chatId?: string;
}

const RescheduleDialogPopup = ({
  setOpen,
  open,
  recruiterName,
  chatId,
}: RescheduleDialogPopupProps) => {
  const router = useRouter();
  const handleRedirect = () => {
    router
      .push(`/candidate/chat?_id=${chatId}`)
      .then(() => {
        // Optional success handling
      })
      .catch((error) => {
        console.error("Error while navigating:", error);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>Reschedule to another date</DialogTitle>
            <DialogDescription>
              <div className="text-start">
                Chat with the recruiter to reschedule the interview to another
                date. Once you&apos;ve confirmed, decline the current invite and
                accept the new invite send by the respective recruiter.
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center pt-3">
            <Button
              variant={"outline"}
              className="flex-grow border border-border bg-[#F7F7F7] font-bold text-[#034A9A] hover:text-[#034A9A]"
              onClick={handleRedirect}
            >
              Chat with{" "}
              {truncate(recruiterName, { length: 20, omission: "..." })}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialogPopup;

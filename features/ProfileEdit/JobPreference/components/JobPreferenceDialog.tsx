import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import JobPereferenceEditForm from "./JobPereferenceEditForm";

interface JobPreferenceDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobPreference: any;
}

const JobPreferenceDialog = ({
  open,
  setOpen,
  jobPreference,
}: JobPreferenceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-5 p-6">
          <DialogHeader className="text-xl font-semibold text-[#171717]">
            Job Preferences
          </DialogHeader>
          {/* form */}
          <JobPereferenceEditForm
            jobPreference={jobPreference}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobPreferenceDialog;

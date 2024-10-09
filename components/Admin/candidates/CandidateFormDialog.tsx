import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";

interface CandidateFormDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CandidateFormDialog = ({ open, setOpen }: CandidateFormDialogProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-screen min-w-full flex-grow">
          {/* Use 'h-screen' for full height and 'w-full' for full width */}
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>{" "}
    </div>
  );
};

export default CandidateFormDialog;

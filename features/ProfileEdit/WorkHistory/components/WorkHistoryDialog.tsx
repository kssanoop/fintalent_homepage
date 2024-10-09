import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import WorkHistoryForm from "./WorkHistoryForm";

interface WorkHistoryDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employmentDetails: any;
  isEdit: boolean;
  clickedIndex: number;
}

const WorkHistoryDialog = ({
  open,
  setOpen,
  employmentDetails,
  isEdit,
  clickedIndex,
}: WorkHistoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-4 px-6 pb-6 pt-8">
          <DialogHeader className="text-xl font-semibold text-[#171717]">
            Work History
          </DialogHeader>
          {/* form */}
          <WorkHistoryForm
            setOpen={setOpen}
            employmentDetails={employmentDetails}
            isEdit={isEdit}
            clickedIndex={clickedIndex}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkHistoryDialog;

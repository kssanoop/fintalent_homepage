import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import EducationForm from "./EducationForm";
import { EducationDetails } from "../Schema/EducationSchema";

interface EducationDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  educationDetails: EducationDetails;
  isEdit: boolean;
  clickedIndex: number;
}

const EducationDialog = ({
  open,
  setOpen,
  isEdit,
  educationDetails,
  clickedIndex,
}: EducationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 px-6 pb-6 pt-8">
          <DialogHeader className="text-xl font-semibold text-[#171717]">
            Educational Qualification
          </DialogHeader>
          {/* form */}
          <EducationForm
            educationDetails={educationDetails}
            isEdit={isEdit}
            clickedIndex={clickedIndex}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EducationDialog;

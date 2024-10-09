import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddRequirementForm from "@/features/tags/recruiter/api/recruiter/components/add-requirement-form";
import React, { Dispatch, SetStateAction } from "react";

interface AddNewRequirementPopupProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddNewRequirementPopup = ({
  isOpen,
  setOpen,
}: AddNewRequirementPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="p-0 lg:min-w-[475px]">
        <div className="flex flex-col gap-[13px] px-6 pb-6 pt-[31px]">
          <DialogHeader>
            <DialogTitle className=" text-xl font-bold text-[#171717]">
              Add requirement
            </DialogTitle>
          </DialogHeader>
          <div>
            <AddRequirementForm setOpen={setOpen} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewRequirementPopup;

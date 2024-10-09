import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { PersonalDetail } from "../Schema/PersonalSchema";

interface PersonalDetailsDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  personalDetails: PersonalDetail;
}

const PersonalDetailsDialog = ({
  open,
  setOpen,
  personalDetails,
}: PersonalDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[550px] p-0">
        <div className="flex flex-col gap-[18px] px-7 py-6">
          <DialogHeader className="text-xl font-semibold leading-normal text-[#171717]">
            Basic Details
          </DialogHeader>
          {/* form */}
          <PersonalDetailsForm
            personalDetails={personalDetails}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalDetailsDialog;

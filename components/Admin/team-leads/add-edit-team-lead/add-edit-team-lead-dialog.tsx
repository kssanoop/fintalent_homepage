import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AddEditTeamLeadDialog = ({
  title,
  open,
  // setOpen,
  handleOpen,
  formComponent,
}: {
  title: string;
  open: boolean;
  handleOpen: (arg: boolean) => void;
  // setOpen: Dispatch<SetStateAction<boolean>>;
  formComponent: JSX.Element;
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleOpen(false);
      }}
    >
      <DialogContent className="max-w-2xl p-0">
        <div className="flex flex-col gap-[18px] px-7 py-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold leading-normal text-[#171717]">
              {title}
            </DialogTitle>
          </DialogHeader>
          {formComponent}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTeamLeadDialog;

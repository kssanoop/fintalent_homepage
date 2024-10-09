import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import LanguageAddForm from "./LanguageAddForm";
import { Language } from "./LanguageCard";

interface LanguageAddDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: Language[];
  isEdit: boolean;
}

const LanguageAddDialog = ({
  open,
  setOpen,
  data,
  isEdit,
}: LanguageAddDialogProps) => {
  console.log("Edit Value:", isEdit);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-3 px-5 pb-5 pt-6">
          <div className="flex flex-col gap-1">
            <DialogHeader className="text-xl font-semibold text-[#171717]">
              {isEdit ? "Languages known" : "Add Language"}
            </DialogHeader>
            <p className="text-base font-semibold text-[#5E5E5E]">
              {!isEdit && "Enter all the languages you know."}
            </p>
          </div>
          {/* form */}
          <div className="flex gap-6 text-base font-semibold text-[#171717]">
            <h3 className="w-[42%]">Language</h3>
            <h3 className="w-[42%]">Proficiency</h3>
          </div>
          <LanguageAddForm data={data} isEdit={isEdit} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageAddDialog;

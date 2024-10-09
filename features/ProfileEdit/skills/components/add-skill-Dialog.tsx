import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import AddSkillForm from "./addSkillForm";
interface AddSkillDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface Skills {
  name: string;
  level: string;
}
export interface stepForm {
  form: UseFormReturn<Skills[]>;
}
const AddSkillDialog = ({ open, setOpen }: AddSkillDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[550px] p-0">
        <div className="flex flex-col gap-6 px-5 py-4">
          <div className="flex flex-col">
            <DialogHeader className="p-0 text-xl font-semibold leading-normal text-[#171717]">
              Add new skills
            </DialogHeader>
            <p className="text-base font-semibold text-[#5E5E5E]">
              Your skills need to be approved by our Consultant.
            </p>
          </div>
          {/* input filelds */}
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-5 text-base font-semibold text-[#171717]">
              <label className="w-[43%]">Skill</label>
              <label className="w[42%]">Rating</label>
            </div>
            <div>
              <AddSkillForm setOpen={setOpen} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillDialog;

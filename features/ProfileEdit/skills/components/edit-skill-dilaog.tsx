import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import EditSkillForm from "./editSkillForm";
import { EditSkillSchema } from "../schema/skills-schema";
interface EditSkillDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  skills: Array<{
    name: string;
    level: string;
  }>;

  pendingSkills: Array<{
    name: string;
    level: string;
  }>;
}

export interface stepForm {
  form: UseFormReturn<EditSkillSchema>;
}
const EditSkillDialog = ({
  open,
  setOpen,
  skills,
  pendingSkills,
}: EditSkillDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[550px] p-0">
        <div className="flex flex-col gap-5 px-5 py-4">
          <div className="flex flex-col">
            <DialogHeader className="p-0 text-xl font-semibold leading-normal text-[#171717]">
              Edit Skills
            </DialogHeader>
          </div>
          {/* input filelds */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-5 text-base font-semibold text-[#171717]">
              <label className="w-[43%]">Skill</label>
              <label className="w[42%]">Rating</label>
            </div>
            <div>
              <EditSkillForm
                skills={skills}
                pendingSkills={pendingSkills}
                setOpen={setOpen}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSkillDialog;

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import AddJobQuestionForm from "./add-job-question-form";
import { AddQuestions } from "@/features/jobs/schema/add-job-question-schema";
import AdminJobQuestionForm from "@/components/Admin/jobs/admin-question-form";

interface AddJobQuestionDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  jobId?: string;
  jobQuestions: AddQuestions[];
  Interface?: string;
}

const AddJobQuestionDialog = ({
  open,
  setOpen,
  jobId,
  jobQuestions,
  Interface,
}: AddJobQuestionDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent className="rounded-xl  p-5 md:min-w-[741px]">
        <div className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold leading-normal text-[#171717]">
              Screening questions
            </DialogTitle>
          </DialogHeader>
          {/* form  */}
          {Interface === "admin" ? (
            <AdminJobQuestionForm />
          ) : (
            <AddJobQuestionForm
              jobId={jobId}
              jobQuestions={jobQuestions}
              Interface={Interface}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobQuestionDialog;

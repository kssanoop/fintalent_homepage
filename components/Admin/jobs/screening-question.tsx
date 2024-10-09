import AddJobQuestionDialog from "@/components/job/job-postings/add-job-question-dialog";
import { Card } from "@/components/ui/card";
import { AddQuestions } from "@/features/jobs/schema/add-job-question-schema";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface ScreeningQuestionPros {
  data: any;
}

const ScreeningQuestion = ({ data }: ScreeningQuestionPros) => {
  const [openAddQuestionDialog, setOpenAddQuestionDialog] = useState(false);
  const jobQuestions: AddQuestions[] = data?.[0]?.adminQuestions;
  // console.log("job questions admin", jobQuestions);
  return (
    <>
      <Card
        className="flex cursor-pointer flex-col gap-1 rounded-[8px] bg-[#FFFFFF] p-4"
        onClick={() => {
          setOpenAddQuestionDialog(true);
        }}
      >
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-base font-bold text-[#171717]">
            Screening questions
          </h3>
          <ChevronRight size={14} color="#000000" />
        </div>
        {/* para */}
        <p className="text-sm font-medium leading-6 text-[#5E5E5E]">
          Add screening questions for job postings
        </p>
      </Card>

      <AddJobQuestionDialog
        open={openAddQuestionDialog}
        setOpen={setOpenAddQuestionDialog}
        jobQuestions={jobQuestions}
        Interface={"admin"}
      />
    </>
  );
};

export default ScreeningQuestion;

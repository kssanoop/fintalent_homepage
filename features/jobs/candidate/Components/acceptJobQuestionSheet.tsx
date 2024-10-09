import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dispatch, SetStateAction } from "react";
import { Question } from "./accpetjobquestion";
import AcceptJobQuestionForm from "./acceptjobQuestionForm";

interface AcceptJobQuestionSheetProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  questions: Question[];
  jobId: string;
  open: boolean;
}
export function AcceptJobQuestionSheet({
  jobId,
  setOpen,
  open,
  questions,
}: AcceptJobQuestionSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen} key={"bottom"}>
      <SheetContent className="block p-6 md:hidden" side={"bottom"}>
        <SheetHeader className="overflow-auto px-1 pb-7 md:max-h-[500px]">
          <div className="flex flex-col gap-1 text-start text-sm font-medium leading-6 text-[#5E5E5E]">
            <SheetTitle className="text-xl font-bold text-[#1C1C1C]">
              Screening questions
            </SheetTitle>
            Let the recruiters know about you.
          </div>
        </SheetHeader>
        <AcceptJobQuestionForm
          setOpen={setOpen}
          questions={questions}
          jobId={jobId}
        />
      </SheetContent>
    </Sheet>
  );
}

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssignCandidateContainer from "./assign-candidates-container";

const AssignCanidatesUnderTlSheet = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen((prev) => !prev);
      }}
    >
      <SheetTrigger className="cursor-pointer font-medium text-brand-blue">
        <Button
          variant="gradient"
          className=" whitespace-pre px-3 py-1.5 text-base font-bold"
        >
          Assign Candidate <Plus color="#fff" size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="md:min-w-3/4 bg-white p-0 md:min-w-[850px]"
        side="right"
      >
        <div className="px-7 py-6">
          <h3 className="mb-2 text-xl font-bold text-brand-black">
            Assign candidate
          </h3>
          <p className="text-[#5E5E5E]">Assign candidates.</p>
        </div>
        <div className="px-7 pb-6">
          <AssignCandidateContainer setIsSheetOpen={setIsSheetOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AssignCanidatesUnderTlSheet;

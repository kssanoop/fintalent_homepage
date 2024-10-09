import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Pencil as EditIcon } from "lucide-react";
import EditJobForm from "./edit-job-form";
import { Job } from "@/features/jobs/schema/all-jobs-schema";

const EditJobSheet = ({ jobDetail }: { jobDetail: Job }) => {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  return (
    <Sheet
      open={isEditSheetOpen}
      onOpenChange={() => {
        setIsEditSheetOpen((prev) => !prev);
      }}
    >
      <SheetTrigger>
        <EditIcon height={16} width={16} className="text-brand-grey" />
      </SheetTrigger>
      <SheetContent
        className="w-full p-0 md:w-3/4 md:max-w-[850px]"
        side="right"
      >
        <div className="border-b border-[#CDCDCD] p-6 text-xl">
          <h3 className="font-bold text-brand-black">Edit job</h3>
        </div>
        <EditJobForm
          jobDetail={jobDetail}
          setIsSheetOpen={setIsEditSheetOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EditJobSheet;

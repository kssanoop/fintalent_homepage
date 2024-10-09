import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddJobForm from "./add-job-form";
import { Plus } from "lucide-react";

const AddJobSheet = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen((prev) => !prev);
      }}
    >
      <SheetTrigger>
        <Button variant="gradient" className="hidden whitespace-pre md:block">
          Post new job +
        </Button>
        <Plus
          size={24}
          className="custom-gradient block rounded p-1 text-white md:hidden"
        />
      </SheetTrigger>
      <SheetContent
        className="w-full p-0 md:w-3/4 md:max-w-[850px]"
        side="right"
      >
        <div className="border-b border-border p-6 text-xl">
          <h3 className="font-bold text-brand-black">Post new job</h3>
        </div>
        <AddJobForm setIsSheetOpen={setIsSheetOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default AddJobSheet;

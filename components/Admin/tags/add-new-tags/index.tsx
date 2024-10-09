import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddNewTagsForm from "./add-new-tags-form";

export const AddNewTags = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger
        onClick={() => {
          setIsSheetOpen(true);
        }}
      >
        <Button variant="gradient" className="hidden whitespace-pre md:block">
          Add new tag +
        </Button>
        <Plus
          size={24}
          className="custom-gradient block rounded p-1 text-white md:hidden"
        />
      </SheetTrigger>
      <SheetContent className="w-[475px] bg-white p-0 md:w-full">
        <div className="px-6 py-6">
          <SheetHeader>
            <SheetTitle className="text-start text-xl font-bold">
              Add new tag
            </SheetTitle>
            <SheetDescription>
              <AddNewTagsForm setIsSheetOpen={setIsSheetOpen} />
            </SheetDescription>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
};

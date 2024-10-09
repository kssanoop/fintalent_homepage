import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SlidersHorizontal, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { JobsFilter } from "../type/jobs-filter";
import JobFilterList from "./job-filter-list";

const JobsFilterSheet = ({
  onSubmit,
  form,
  isViewAllFilterType,
  setIsViewAllFilterType,
}: {
  onSubmit: SubmitHandler<JobsFilter>;
  form: UseFormReturn<JobsFilter, any, JobsFilter>;
  isViewAllFilterType: boolean;
  setIsViewAllFilterType: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isResetClicked, setIsResetClicked] = useState(false);

  return (
    <Sheet
      open={isViewAllFilterType}
      onOpenChange={(value) => {
        setIsViewAllFilterType(value);
        console.log("openChange called", value);
        console.log(form.formState.isDirty);
        if (!value) {
          if (form.formState.isDirty && !isResetClicked) {
            console.log("clear");
            form.reset({}, { keepDirty: false });
            // form.reset({}, { keepIsSubmitted: true });
          }

          form.handleSubmit(onSubmit)();
        }
        if (isResetClicked) {
          console.log("first");
          form.reset();
          setIsResetClicked(false);
        }
      }}
    >
      <SheetTrigger className="m-0">
        <p className="hidden text-sm font-bold text-brand-blue-light md:block">
          view all
        </p>
        <SlidersHorizontal size={16} className="cursor-pointer md:hidden" />
      </SheetTrigger>
      <SheetContent
        isDefaultCloseVisible={false}
        side="right"
        className="w-full bg-white px-4 py-3 sm:max-w-lg"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <div className="flex items-center justify-between border-b border-border-secondary">
              <h4 className="p-4 font-bold text-brand-black">All filters</h4>
              <SheetClose className=" ">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>

            <div className="scroll-container mr-1  grow overflow-hidden hover:mr-0 hover:overflow-auto">
              <JobFilterList form={form} filterType="viewAll" />
            </div>
            <SheetFooter className="flex-row justify-end space-x-2 border-t border-border-secondary p-5">
              <Button
                onClick={() => {
                  setIsResetClicked(true);
                  setIsViewAllFilterType(false);
                  form.reset();
                  form.handleSubmit(onSubmit)();
                }}
                type="button"
                variant="outline"
                className="border-0 bg-[#EFEFEF] text-brand-black"
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  setIsViewAllFilterType(false);
                }}
                variant="gradient"
              >
                Apply filters
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default JobsFilterSheet;
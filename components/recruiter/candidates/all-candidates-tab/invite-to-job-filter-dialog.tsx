import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterCard from "@/components/side-filter/side-filter-card";

import { SlidersHorizontal, X } from "lucide-react";
import { Form } from "@/components/ui/form";

import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import { useState } from "react";
import JobFilterList from "@/features/jobs/jobs-filter/component/job-filter-list";
import { ScrollArea } from "@/components/ui/scroll-area";

type InviteToJobFilterDialogProps = {
  form: UseFormReturn<JobsFilter, any, JobsFilter>;
  onSubmit: SubmitHandler<JobsFilter>;
};
export default function InviteToJobFilterDialog({
  form,
  onSubmit,
}: InviteToJobFilterDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SlidersHorizontal size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        isDefaultCloseVisible={false}
        className="h-[70vh] max-w-3xl gap-0 p-0"
      >
        <FilterCard.Header>
          <h3 className="text-[#171717]">All Filters</h3>
          <DialogClose>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </FilterCard.Header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col overflow-auto"
          >
            <ScrollArea className="">
              <JobFilterList form={form} filterType="viewAll" />
            </ScrollArea>

            <DialogFooter className="flex-row justify-end space-x-2 border-t border-border-secondary p-5">
              <Button
                onClick={() => {
                  form.reset();
                }}
                type="button"
                variant="outline"
                className="border-0 bg-[#EFEFEF] text-brand-black"
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                variant="gradient"
              >
                Apply filters
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

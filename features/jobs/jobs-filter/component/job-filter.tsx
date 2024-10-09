import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useFormSubmitionOnFieldChange } from "@/utils/hooks/useFormSubmitionOnFieldChange";
import { JobsFilter } from "../type/jobs-filter";
import JobFilterList from "./job-filter-list";
import { ScrollArea } from "@/components/ui/scroll-area";

const JobFilter = ({
  jobsFilterSheet,
  form,
  onSubmit,
  isViewAllFilterType,
}: {
  onSubmit: SubmitHandler<JobsFilter>;
  form: UseFormReturn<JobsFilter, any, JobsFilter>;
  jobsFilterSheet: ReactNode;
  isViewAllFilterType: boolean;
}) => {
  useFormSubmitionOnFieldChange({
    form,
    onSubmit,
    enabled: !isViewAllFilterType,
  });
  return (
    <Card className="h-full rounded-[10px] pb-4">
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border-secondary">
        <CardTitle className="text-base font-bold text-brand-black ">
          Filters
        </CardTitle>
        {jobsFilterSheet}
      </CardHeader>
      <ScrollArea className=" h-[calc(100%-54px)]  p-0 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <JobFilterList form={form} filterType="viewLess" />
          </form>
        </Form>
      </ScrollArea>
    </Card>
  );
};

export default JobFilter;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { CandidateFilters } from "../type/candidate-filter";
import CandidateFilterList from "@/components/search/filter/candidate-filter/candidate-filter-list";
import { Form } from "@/components/ui/form";
import { useFormSubmitionOnFieldChange } from "@/utils/hooks/useFormSubmitionOnFieldChange";

const CandidatesFilter = ({
  candidatesFilterSheet,
  form,
  onSubmit,
  isViewAllFilterType,
}: {
  onSubmit: SubmitHandler<CandidateFilters>;
  form: UseFormReturn<CandidateFilters, any, CandidateFilters>;
  candidatesFilterSheet: ReactNode;
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
        {candidatesFilterSheet}
      </CardHeader>
      <CardContent className="hide-scrollbar h-[calc(100%-54px)] overflow-auto p-0 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <CandidateFilterList form={form} filterType="viewLess" />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CandidatesFilter;

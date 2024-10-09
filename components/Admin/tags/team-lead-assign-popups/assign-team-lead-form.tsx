import MultiSelectInput from "@/components/layout/multi-select-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useGetTeamLeadsForAdmin from "@/features/admin/team-lead/api/get-team-leads-for-admin";
import { useAssignTeamLeads } from "@/features/tags/admin/api/assign-team-leads";
import { teamleads } from "@/features/tags/type/tags-info";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type AssignTeamLeadFormType = {
  teamLeads: Array<{
    label: string;
    value: string;
  }>;
};

interface AssignTeamLeadFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teamLeadsdata: teamleads;
  tagId: string;
}

const AssignTeamLeadForm = ({
  setOpen,
  teamLeadsdata,
  tagId,
}: AssignTeamLeadFormProps) => {
  const queryClient = useQueryClient();
  const { data: teamLeads, isFetching, isError } = useGetTeamLeadsForAdmin();

  // form success submit
  const formSubmissionhandleSuccess = (response: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["tags-admin"] });
    queryClient.invalidateQueries({ queryKey: ["get-tag-by-id"] });
    toast.success(response?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitError,
  } = useAssignTeamLeads(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );
  // console.log("Team Leads data:", teamLeads);
  const options: Array<{ value: string; label: string }> | undefined =
    teamLeads?.map((item: any) => ({
      value: item?.teamLeadId,
      label: item?.name,
    }));

  const selectedTeamLeads =
    teamLeadsdata.length > 0 &&
    teamLeadsdata?.map((item: any) => ({
      label: item?.name,
      value: item?.teamLeadId,
    }));

  //   console.log("Selected Team leads:", selectedTeamLeads);
  const form = useForm<AssignTeamLeadFormType>({
    defaultValues: {
      teamLeads: selectedTeamLeads as Array<
        { label?: string | undefined; value?: string | undefined } | undefined
      >,
    },
  });

  const onSubmit: SubmitHandler<AssignTeamLeadFormType> = (values) => {
    const updatedFormData = values?.teamLeads?.map((item: any) => item?.value);

    // console.log("Form values:", updatedFormData);
    mutate({ teamLeadIds: updatedFormData, tagId });
  };
  return (
    <>
      {isFetching && !isError ? (
        <Loader2 className="h-4 w-4 animate-spin self-center" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="teamLeads"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {options && (
                      <MultiSelectInput
                        options={options}
                        placeholder="Select a team lead"
                        height={51}
                        defaultValue={field?.value}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant={"outline"}
                className="border border-[#A9A9A9] bg-[#FFF] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              {isSubmitting && !isSubmitError ? (
                <Button disabled variant={"gradient"}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </Button>
              ) : (
                <Button variant={"gradient"}>Confirm</Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default AssignTeamLeadForm;

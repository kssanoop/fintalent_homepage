import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TeamLeadFormSchema } from "@/features/team-lead/schema/team-lead-form-schema";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import TeamLeadFormItems from "./team-lead-form-items";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import useEditTeamLeadByAdmin from "@/features/admin/team-lead/api/edit-team-lead-by-admin";
import { RoleTypes } from "@/types/authorization";
import { getQueryKeyForAddTeamLead } from "./add-team-lead-form";

interface UserDetailsFormProps {
  teamLead: TeamLeadInfo;
  handleOpen: (arg: boolean) => void;
  role: RoleTypes;
}

const EditTeamLeadForm = ({
  teamLead,
  handleOpen,
  role,
}: UserDetailsFormProps) => {
  const queryClient = useQueryClient();

  const handleSuccessSubmit = (data: any) => {
    handleOpen(false);
    queryClient.invalidateQueries({
      queryKey: [getQueryKeyForAddTeamLead(role)],
    });
  };

  const handleErrorSubmit = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useEditTeamLeadByAdmin(handleSuccessSubmit, handleErrorSubmit);

  const onSubmit: SubmitHandler<TeamLeadFormSchema> = (values) => {
    console.log(values);
    mutate({ teamLeadId: teamLead.teamLeadId, data: values });
  };
  const form = useForm<TeamLeadFormSchema>({
    defaultValues: {
      name: teamLead.name,
      designation: teamLead.designation,
      phoneNo: teamLead.phoneNo,
      email: teamLead.email,
      profilePhoto: {
        originalName: teamLead.profilePhoto.originalName,
        storageName: teamLead.profilePhoto.storageName,
      },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  console.log(teamLead);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col overflow-auto px-1">
          <TeamLeadFormItems form={form} />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => {
              handleOpen(false);
              form.reset();
            }}
            variant={"outline"}
            className="h-[59px] w-[152px] rounded-lg border-0 px-2.5 py-4 text-xl font-bold text-brand-black"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="gradient"
            disabled={isSubmitting && !isSubmitionError}
            style={{ boxShadow: "0px 4px 22px 0px rgba(53, 36, 88, 0.54)" }}
            className=" h-[59px] w-[152px] px-2.5 py-4 text-xl font-bold"
          >
            {isSubmitting && !isSubmitionError ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditTeamLeadForm;

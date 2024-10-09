import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import TeamLeadFormItems from "./team-lead-form-items";
import { TeamLeadFormSchema } from "@/features/team-lead/schema/team-lead-form-schema";
import useCreateTeamLead from "@/features/admin/team-lead/api/create-team-lead";
import { Loader2 } from "lucide-react";
import { RoleTypes } from "@/types/authorization";

interface UserDetailsFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  role: RoleTypes;
}

export const getQueryKeyForAddTeamLead = (role: RoleTypes) => {
  switch (role) {
    case "admin":
      return "team-leads-for-admin";
    case "manager":
      return "team-leads-for-manager";
    default:
      break;
  }
};

const AddTeamLeadForm = ({ setOpen, role }: UserDetailsFormProps) => {
  const queryClient = useQueryClient();
  // handle success function
  const handleSuccessSubmit = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({
      queryKey: [getQueryKeyForAddTeamLead(role)],
    });
  };

  // handle error function
  const handleErrorSubmit = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const { mutate, isLoading, isError } = useCreateTeamLead(
    handleSuccessSubmit,
    handleErrorSubmit,
  );
  const form = useForm<TeamLeadFormSchema>({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<TeamLeadFormSchema> = (values) => {
    console.log(values);
    mutate({ data: values, role });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col overflow-auto px-1">
          <TeamLeadFormItems form={form} />
        </div>
        {/* button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => {
              form.reset();
              setOpen(false);
            }}
            variant={"outline"}
            className="h-[59px] w-[152px] rounded-lg border-0 px-2.5 py-4 text-xl font-bold text-brand-black"
          >
            Cancel
          </Button>

          <Button
            disabled={isLoading && !isError}
            type="submit"
            variant="gradient"
            style={{ boxShadow: "0px 4px 22px 0px rgba(53, 36, 88, 0.54)" }}
            className=" h-[59px] w-[152px] px-2.5 py-4 text-xl font-bold"
          >
            {isLoading && !isError ? (
              <>
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
          {/* )} */}
        </div>
      </form>
    </Form>
  );
};

export default AddTeamLeadForm;

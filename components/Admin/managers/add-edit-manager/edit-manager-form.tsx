import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ManagerFormItems from "./manager-form-items";
import { Form } from "@/components/ui/form";
import { ManagerSchema } from "@/features/managers/admin/schema/manager-schema";
import { ManagerInfo } from "@/features/admin/manager/type/manager-info";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import useEditManagerByAdmin from "@/features/admin/manager/api/edit-manager-by-admin";

interface UserDetailsFormProps {
  manager: ManagerInfo;
  handleOpen: (arg: boolean) => void;
}

const EditManagerForm = ({ manager, handleOpen }: UserDetailsFormProps) => {
  const queryClient = useQueryClient();

  const handleSuccessSubmit = (data: any) => {
    handleOpen(false);
    queryClient.invalidateQueries({ queryKey: ["managers-for-admin"] });
  };

  const handleErrorSubmit = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useEditManagerByAdmin(handleSuccessSubmit, handleErrorSubmit);

  const onSubmit: SubmitHandler<ManagerSchema> = (values) => {
    mutate({ data: values, managerId: manager.managerId });
  };
  const form = useForm<ManagerSchema>({
    defaultValues: {
      name: manager.name,
      designation: manager.designation,
      department: manager.department, // department not coming on response, need to update api response
      phoneNo: manager.phoneNo,
      email: manager.email,
      profilePhoto: {
        originalName: manager.profilePhoto.originalName,
        storageName: manager.profilePhoto.storageName,
      },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col overflow-auto px-1">
          <ManagerFormItems form={form} />
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

export default EditManagerForm;

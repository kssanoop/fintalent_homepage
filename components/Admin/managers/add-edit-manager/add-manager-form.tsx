import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import ManagerFormItems from "./manager-form-items";
import { Form } from "@/components/ui/form";
import { ManagerSchema } from "@/features/managers/admin/schema/manager-schema";
import useCreateManagerByAdmin from "@/features/admin/manager/api/create-manager-by-admin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface UserDetailsFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddManagerForm = ({ setOpen }: UserDetailsFormProps) => {
  const queryClient = useQueryClient();
  // handle success function
  const handleSuccessSubmit = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["managers-for-admin"] });
  };

  // handle error function
  const handleErrorSubmit = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const { mutate } = useCreateManagerByAdmin(
    handleSuccessSubmit,
    handleErrorSubmit,
  );
  const form = useForm<ManagerSchema>({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ManagerSchema> = (values) => {
    console.log(values);
    mutate(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col overflow-auto px-1">
          <ManagerFormItems form={form} />
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
            type="submit"
            variant="gradient"
            style={{ boxShadow: "0px 4px 22px 0px rgba(53, 36, 88, 0.54)" }}
            className=" h-[59px] w-[152px] px-2.5 py-4 text-xl font-bold"
          >
            Save
          </Button>
          {/* )} */}
        </div>
      </form>
    </Form>
  );
};

export default AddManagerForm;

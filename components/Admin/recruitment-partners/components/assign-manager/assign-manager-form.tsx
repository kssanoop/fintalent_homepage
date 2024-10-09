import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ManagerInfo } from "@/features/admin/manager/type/manager-info";
import { useAssignManager } from "@/features/recuitment-partners/admin/api/assign-manager";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type AssignManagerFormType = {
  companyId: string;
  managerId: string;
};

interface AssignManagerFormProps {
  companyId: string;
  defaultManagerId: string;
  isLoading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: ManagerInfo[];
}

const AssignManagerForm = ({
  companyId,
  defaultManagerId,
  isLoading,
  setOpen,
  data,
}: AssignManagerFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<AssignManagerFormType>({
    defaultValues: {
      managerId: defaultManagerId,
      companyId,
    },
  });
  // form success submit
  const formSubmissionhandleSuccess = (response: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["company-by-id"] });
    toast.success(response?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const {
    mutate,
    isLoading: isSubmitting,
    isError,
  } = useAssignManager(formSubmissionhandleSuccess, formSubmissionhandleError);

  const onSubmit: SubmitHandler<AssignManagerFormType> = (values) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="managerId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  defaultValue={field?.value}
                  onValueChange={field?.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Manager" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[150px]">
                    {isLoading ? (
                      <div className="text-sm font-medium text-[#969696]">
                        Loading..
                      </div>
                    ) : (
                      data?.map((item: ManagerInfo) => (
                        <SelectItem
                          value={item?.managerId}
                          key={crypto?.randomUUID()}
                        >
                          <div className="flex items-center gap-[7px]">
                            <Avatar>
                              <AvatarImage
                                className="h-10 w-10"
                                src={`${process.env.NEXT_PUBLIC_IMG_URL}${item?.profilePhoto?.storageName}`}
                              />
                              <AvatarFallback>{item?.name}</AvatarFallback>
                            </Avatar>
                            <p className="text-sm font-medium text-[#171717]">
                              {item?.name}
                            </p>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3.5">
          <Button
            type="button"
            variant={"outline"}
            className="border border-border bg-[#F2F2F2] text-base font-bold text-[#171717] hover:text-[#171717]"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          {isSubmitting && !isError ? (
            <Button variant={"gradient"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Assigning..
            </Button>
          ) : (
            <Button variant={"gradient"}>Confirm</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AssignManagerForm;

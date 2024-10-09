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
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import useAssignTeamLeadToCandidateByAdmin from "@/features/admin/team-lead/api/assign-team-lead-to-candidate";
import useGetTeamLeadsForAdmin from "@/features/admin/team-lead/api/get-team-leads-for-admin";
import useGetTeamLeadsForManager from "@/features/managers/api/get-team-leads-for-manager";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type AssignManagerFormType = {
  candidateId: string;
  teamLeadId: string;
};

interface AssignManagerFormProps {
  candidateId: string;
  defaultTeamLead: string | undefined;
  isLoading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: TeamLeadInfo[] | undefined;
}

const TLForm = ({
  candidateId,
  defaultTeamLead,
  setOpen,
}: AssignManagerFormProps) => {
  const { role } = useGetInfoFromCookie();
  const { data: tlForAdmin, isLoading: isTlForAdminLoading } =
    useGetTeamLeadsForAdmin({}, role === "admin");
  const { data: tlForManager, isLoading: isTlForManagerLoading } =
    useGetTeamLeadsForManager({}, role === "manager");

  const data =
    role === "admin" ? tlForAdmin : role === "manager" ? tlForManager : [];

  const isLoading =
    role === "admin"
      ? isTlForAdminLoading
      : role === "manager" && isTlForManagerLoading;

  // console.log("team lead data:", data);
  console.log("default team lead data:", defaultTeamLead);

  const form = useForm<AssignManagerFormType>({
    defaultValues: {
      teamLeadId: defaultTeamLead,
    },
  });
  // form success submit
  const formSubmissionhandleSuccess = (response: any) => {
    setOpen(false);
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
  } = useAssignTeamLeadToCandidateByAdmin(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );

  const onSubmit: SubmitHandler<AssignManagerFormType> = (values) => {
    mutate({
      candidateId,
      teamLeadId: values?.teamLeadId,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="teamLeadId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  defaultValue={field?.value}
                  onValueChange={field?.onChange}
                >
                  <SelectTrigger className="h-14 w-full">
                    <SelectValue placeholder="Select Team Lead" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {isLoading ? (
                      <div className="text-sm font-medium text-[#969696]">
                        Loading..
                      </div>
                    ) : (
                      data?.map((item: any) => (
                        <SelectItem
                          value={item?.teamLeadId}
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

export default TLForm;

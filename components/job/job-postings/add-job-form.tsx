import useAddJob from "@/features/jobs/api/add-job";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { SubmitHandler, useForm } from "react-hook-form";
import { JobSchema } from "@/features/jobs/schema/add-and-edit-job-schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import JobFormFields from "./job-form-fields";

const AddJobForm = ({
  setIsSheetOpen,
}: {
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
    setIsSheetOpen(false);
    form.reset();
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error.message);
  };
  const { mutate, isLoading, isError } = useAddJob(handleSuccess, handleError);

  const form = useForm<JobSchema>({
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      employmentMode: "onSite",
      jobLocation: "",
      jobType: ["fullTime"],
      jobSchedule: "morning",
      qualifications: [],
      skills: [],
      experianceLevel: "fresher",
      minSalary: "",
      maxSalary: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<JobSchema> = (data) => {
    // const formattedData = {
    //   ...data,
    //   qualifications: data.qualifications.map((q: any) => q.value),
    //   skills: data.skills.map((skill: any) => skill.value),

    // };
    mutate(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="scroll-container h-[calc(100%-157px)] overflow-auto">
            <JobFormFields form={form} />
          </div>
          <div className="flex items-center justify-end gap-2.5 bg-white p-5">
            <Button
              type="button"
              variant="outline"
              className="border-0 text-brand-black"
              onClick={() => {
                setIsSheetOpen(false);
                form.reset();
              }}
            >
              Cancel
            </Button>
            <Button variant="gradient" disabled={isLoading && !isError}>
              {isLoading && !isError ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding..
                </>
              ) : (
                "Post Job"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddJobForm;

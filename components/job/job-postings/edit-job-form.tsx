import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { JobSchema } from "@/features/jobs/schema/add-and-edit-job-schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import JobFormFields from "./job-form-fields";
import useEditJob from "@/features/jobs/api/edit-job";
import { Job } from "@/features/jobs/schema/all-jobs-schema";

const EditJobForm = ({
  jobDetail,
  setIsSheetOpen,
}: {
  jobDetail: Job;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log(jobDetail.skills);
  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    // queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
    queryClient.invalidateQueries();

    setIsSheetOpen(false);
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error.message);
  };
  const { mutate, isLoading, isError } = useEditJob(handleSuccess, handleError);
  const form = useForm<JobSchema>({
    defaultValues: {
      jobTitle: jobDetail.jobTitle,
      jobDescription: jobDetail.jobDescription,
      employmentMode: jobDetail.employmentMode,
      jobLocation: jobDetail.jobLocation,
      jobType: jobDetail.jobType,
      jobSchedule: jobDetail.jobSchedule,
      skills: jobDetail.skills,
      qualifications: jobDetail.qualifications,
      experianceLevel: jobDetail.experianceLevel,
      minSalary: jobDetail.minSalary.toString(),
      maxSalary: jobDetail.maxSalary.toString(),
    },
  });

  const onSubmit: SubmitHandler<JobSchema> = (data) => {
    mutate({ data, jobId: jobDetail._id });
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
                  Saving..
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditJobForm;

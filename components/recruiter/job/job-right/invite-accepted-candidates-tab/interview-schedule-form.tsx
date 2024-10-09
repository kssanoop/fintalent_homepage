import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeSlots } from "@/features/availability/schema/availability-schema";
import useGetTimeSlotsForInterview from "@/features/interview/api/get-time-slots-for-interview";
import useScheduleInterview from "@/features/interview/api/schedule-interview";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { formatDate } from "@/utils/format-date";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type FormSchema = {
  interviewUrl: string;
  date: string;
  time: string;
};

const InterviewScheduleForm = ({
  candidateInfo,
  jobApplicationId,
  setIsFormOpen,
}: {
  candidateInfo: JobApplicationSchema;
  jobApplicationId: string;
  setIsFormOpen: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  console.log(candidateInfo);

  const form = useForm<FormSchema>({
    defaultValues: {
      // date: new Date().toISOString(),
    },
  });

  const handleSuccess = (data: any) => {
    setIsFormOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["job-application-by-recruiter"],
    });
    toast.success("Interview scheduled successfully");
  };
  const handleError = (error: any) => {
    toast.error(error.response.message);
  };

  const {
    mutate,
    isLoading: isFormSubmitting,
    isError: isSubmitionError,
  } = useScheduleInterview(handleSuccess, handleError);

  const { data, isFetching } = useGetTimeSlotsForInterview({
    date: form.watch("date"),
    candidateId: candidateInfo.candidateId,
  });

  useEffect(() => {
    if (data) form.setValue("time", data[0]);
  }, [data, form]);

  // console.log(data);
  // console.log(form.watch("time"));

  const handleTimeSelection = (dateString: string) => {
    form.setValue("time", dateString);
  };

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    console.log(data);
    const date = new Date(values.date);
    const time = new Date(values.time);
    if (values.date && values.time) {
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
      ).toISOString();

      mutate({
        data: {
          interviewUrl: values.interviewUrl,
          startDateTime: combinedDateTime,
        },
        jobApplicationId,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[500px] flex-col gap-6 overflow-y-auto md:mx-auto lg:h-full lg:w-[650px] lg:overflow-hidden"
      >
        <FormField
          control={form.control}
          name="interviewUrl"
          rules={{
            required: "This field is required",
            validate: (value) =>
              /^https:\/\//.test(value) || "Enter a valid HTTPS URL",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-brand-black">Meeting link</FormLabel>
              <FormControl>
                <Input
                  placeholder="paste link here"
                  {...field}
                  className="rounded-[5px] p-2 placeholder:text-[#A9A9A9]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label htmlFor="calendar" className=" text-brand-black">
            Select Date & Time
          </Label>
          <div className="mx-auto mt-2 flex flex-col md:gap-12 lg:flex-row">
            <FormField
              control={form.control}
              name="date"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <div>
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(value) => {
                      form.setValue("date", formatDate(value));
                    }}
                    disabled={(date) =>
                      date < new Date() ||
                      date < new Date("1900-01-01") ||
                      (candidateInfo?.candidate.availability.availableFrom
                        ? date <
                          new Date(
                            candidateInfo?.candidate.availability.availableFrom,
                          )
                        : true) ||
                      !candidateInfo?.candidate.availability.timeSlots[
                        format(date, "EEEE").toLowerCase() as keyof TimeSlots
                      ].available
                    }
                    className=" rounded-xl border border-[#F5F5F5]"
                  />
                  <FormMessage />
                </div>
              )}
            />

            <div className="  py-6">
              <h6 className="mb-3 text-sm font-semibold text-brand-black">
                Select available time slot
              </h6>
              <div className="scroll-container h-[300px] space-y-3 overflow-y-auto md:w-[300px]">
                {isFetching ? (
                  <>
                    {[...Array(5)].map((_) => (
                      <div
                        key={crypto.randomUUID()}
                        className="flex cursor-pointer items-center rounded-[5px] border border-[#E1E1E1] p-2 "
                      >
                        <Skeleton className="h-5 w-11" /> -{" "}
                        <Skeleton className="h-5 w-11" />
                      </div>
                    ))}
                  </>
                ) : !form.watch("date") ? (
                  <h1 className="text-lg text-brand-blue">Select a date</h1>
                ) : (
                  data?.map((dateString) => (
                    <div
                      key={crypto.randomUUID()}
                      className={`cursor-pointer rounded-[5px] border p-2 text-base ${
                        form.watch("time") === dateString
                          ? "border-brand-blue font-semibold text-brand-blue"
                          : "border-[#E1E1E1] text-brand-black"
                      } `}
                      onClick={() => {
                        handleTimeSelection(dateString);
                      }}
                    >
                      {format(new Date(dateString), "HH:mm")} -{" "}
                      {format(
                        new Date(
                          new Date(dateString).setMinutes(
                            new Date(dateString).getMinutes() + 30,
                          ),
                        ),
                        "HH:mm",
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {" "}
          <Button
            onClick={() => {
              setIsFormOpen(false);
            }}
            type="button"
            variant="outline"
            className="w-[85px] rounded-lg"
          >
            Cancel
          </Button>
          <Button
            disabled={isFormSubmitting && !isSubmitionError}
            variant="gradient"
            className="w-[85px] rounded-lg"
          >
            {isFormSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InterviewScheduleForm;

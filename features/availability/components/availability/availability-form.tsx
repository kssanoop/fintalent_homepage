import { SubmitHandler, useForm } from "react-hook-form";
import { AvailabilitySchema } from "../../schema/availability-schema";
import { SetOpenType } from "../../types/types";
import useEditAvailability from "../../api/edit-availability";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { CandidateProfileSchema } from "@/features/profile/candidate/schema/candidate-profile-schema";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TimeRangePickerList from "../timerange-picker-list";
import AvailableFromCalendar from "./available-from-calendar";
import { toast } from "sonner";
import { getTimeSlots } from "../../utils";

interface AvailabilityFormProps extends SetOpenType {
  data: CandidateProfileSchema["data"];
}

const afterAndBeforeList = [
  {
    id: "buffer15minBefore",
    label: "15 minute before event",
  },
  {
    id: "buffer15minAfter",
    label: "15 minute after event",
  },
] as const;

const days = [
  {
    day: "sunday",
    label: "SUN",
  },
  {
    day: "monday",
    label: "MON",
  },
  {
    day: "tuesday",
    label: "TUE",
  },
  {
    day: "wednesday",
    label: "WED",
  },
  {
    day: "thursday",
    label: "THU",
  },
  {
    day: "friday",
    label: "FRI",
  },
  {
    day: "saturday",
    label: "SAT",
  },
] as const;

const AvailabilityForm = ({ setOpen, data }: AvailabilityFormProps) => {
  const [parent] = useAutoAnimate();

  const queryClient = useQueryClient();
  console.log(data);

  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
  };

  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useEditAvailability(handleSuccess, handleError);

  const form = useForm<AvailabilitySchema>({
    defaultValues: {
      timeSlots: {
        sunday: {
          available: data.availability.timeSlots.sunday.available,
          timeSlots: getTimeSlots(data.availability.timeSlots.sunday.timeSlots),
        },
        monday: {
          available: data.availability.timeSlots.monday.available,
          timeSlots: getTimeSlots(data.availability.timeSlots.monday.timeSlots),
        },
        tuesday: {
          available: data.availability.timeSlots.tuesday.available,
          timeSlots: getTimeSlots(
            data.availability.timeSlots.tuesday.timeSlots,
          ),
        },
        wednesday: {
          available: data.availability.timeSlots.wednesday.available,
          timeSlots: getTimeSlots(
            data.availability.timeSlots.wednesday.timeSlots,
          ),
        },
        thursday: {
          available: data.availability.timeSlots.thursday.available,
          timeSlots: getTimeSlots(
            data.availability.timeSlots.thursday.timeSlots,
          ),
        },
        friday: {
          available: data.availability.timeSlots.friday.available,
          timeSlots: getTimeSlots(data.availability.timeSlots.friday.timeSlots),
        },
        saturday: {
          available: data.availability.timeSlots.saturday.available,
          timeSlots: getTimeSlots(
            data.availability.timeSlots.saturday.timeSlots,
          ),
        },
      },
      availableFrom: data.availability.availableFrom,
      buffer15minBefore: data.availability.buffer15minBefore,
      buffer15minAfter: data.availability.buffer15minAfter,
    },
  });

  const onCancel = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<AvailabilitySchema> = (values) => {
    mutate({ availability: { ...values } });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <div>
          <div className="mb-6">
            <AvailableFromCalendar form={form} />
          </div>

          <div>
            <FormLabel className="font-semibold text-[#171717]">
              Available Time Slots
            </FormLabel>
            <p className="mb-8 mt-2 text-sm font-semibold text-[#5E5E5E]">
              Set your availability for recruiters to schedule interviews.
              Please note that the minimum duration should be 30 minutes*
            </p>
            <div className="max-h-[20vh] overflow-y-auto md:max-h-[30vh]">
              {days.map(({ day, label }) => (
                <div key={day} className="mb-6">
                  <FormField
                    control={form.control}
                    name={`timeSlots.${day}.available`}
                    render={({ field }) => {
                      return (
                        <div
                          ref={parent}
                          className="flex items-start gap-3 md:gap-[45px]"
                        >
                          <FormItem
                            key={day}
                            className="flex w-[70px] flex-row items-center space-x-3 space-y-0 md:w-[75px]"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-extrabold text-[#171717]">
                              {label}
                            </FormLabel>
                          </FormItem>

                          {form.watch(`timeSlots.${day}.available`) ? (
                            <TimeRangePickerList form={form} day={day} />
                          ) : (
                            <p className="text-sm text-[#5E5E5E]">
                              Unavailable
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            <p className="text-sm font-semibold text-[#5E5E5E]">
              Want to add time before and after the event?
            </p>

            {afterAndBeforeList.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4 sm:space-x-0">
          <Button
            onClick={onCancel}
            type="button"
            variant="outline"
            className="w-[85px] bg-white"
          >
            Cancel
          </Button>

          {isSubmitting && !isSubmitionError ? (
            <Button disabled variant={"gradient"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </Button>
          ) : (
            <Button type="submit" variant="gradient" className="w-[85px]">
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AvailabilityForm;

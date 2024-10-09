import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/utils/cnHelper";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useGetTimeSlots from "../../api/get-timeslots";
import { useQueryClient } from "@tanstack/react-query";
import useCreateBlocker from "../../api/create-blocker";
import { toast } from "sonner";
import useGetCandidateProfile from "@/features/profile/candidate/api/getProfile";
import { TimeSlots } from "../../schema/availability-schema";

interface Schema {
  date: string;
  time: string;
}

const BlockedSlotsList = () => {
  const [openCalendar, setOpenCalendar] = useState(false);

  const form = useForm<Schema>({
    defaultValues: {
      date: "",
      time: "",
    },
  });

  const { data: candidateProfile, isLoading: isProfileLoading } =
    useGetCandidateProfile();

  const { data, isFetching } = useGetTimeSlots(form.getValues("date"));
  console.log(data);

  const queryClient = useQueryClient();

  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["blocked-slots"] });
    form.reset();
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error.response?.data?.message);
  };

  const { mutate } = useCreateBlocker(handleSuccess, handleError);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log(data);
    const date = new Date(data.date);
    const time = new Date(data.time);
    if (data.date && data.time) {
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
      ).toISOString();
      mutate({ date: combinedDateTime });
      console.log("Combined DateTime:", combinedDateTime);
    }
  };

  const fetchTimeSlots = () => {
    console.log("first");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full gap-[30px]">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={isProfileLoading}
                      variant={"outline"}
                      className={cn(
                        "h-12 w-full justify-between rounded-[5px] border border-[#E1E1E1] bg-white px-3 py-[5px] text-left font-normal text-[#171717]",
                        !field.value && "text-[#A9A9A9]",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                      <CalendarIcon className="mr-2 h-4 w-4 text-brand-black" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(date) => {
                        field.onChange(date?.toISOString());
                        if (date) fetchTimeSlots();
                      }}
                      initialFocus
                      disabled={(
                        date, // disabling based on the current date, available from date, and unavailable day
                      ) =>
                        date <= new Date() ||
                        date < new Date("1900-01-01") ||
                        (candidateProfile?.availability.availableFrom
                          ? date <
                            new Date(
                              candidateProfile?.availability.availableFrom,
                            )
                          : true) ||
                        !candidateProfile?.availability.timeSlots[
                          format(date, "EEEE").toLowerCase() as keyof TimeSlots
                        ].available
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl>
                  <DatePicker
                    placeholderText="Select time slot"
                    className={`h-12 w-full cursor-pointer rounded-[5px] border border-[#CDCDCD] px-4 py-3 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-ring ${
                      isFetching && "cursor-progress"
                    } `}
                    selected={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      if (date) {
                        form.setValue("time", new Date(date).toISOString());
                      }
                    }}
                    includeTimes={data?.map((dateString) => {
                      return new Date(dateString);
                    })}
                    timeIntervals={15}
                    showTimeSelect
                    showTimeSelectOnly
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={isFetching}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit">
            <Plus />
          </button>
        </div>
      </form>
    </Form>
  );
};

export default BlockedSlotsList;

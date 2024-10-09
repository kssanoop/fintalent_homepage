import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AvailabilitySchema } from "../../schema/availability-schema";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/utils/cnHelper";
import { format } from "date-fns";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface AvailableFromCalendarProps {
  form: UseFormReturn<AvailabilitySchema, any, AvailabilitySchema>;
}

const AvailableFromCalendar = ({ form }: AvailableFromCalendarProps) => {
  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <FormField
      control={form.control}
      name="availableFrom"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-0">
          <FormLabel className="mb-1 text-[#171717]">Available from</FormLabel>
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-between rounded-[5px] border border-[#E1E1E1] bg-white px-3 py-[5px] text-left font-normal text-[#171717]",
                  !field.value && "text-muted-foreground",
                )}
              >
                {field.value ? (
                  format(new Date(field.value), "PPP")
                ) : (
                  <span>Choose date</span>
                )}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(field.value)}
                onSelect={field.onChange}
                initialFocus
                disabled={(date) =>
                  date <= new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AvailableFromCalendar;

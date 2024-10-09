import { setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { AvailabilitySchema } from "../schema/availability-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DaysTypes } from "../types/types";
import { Trash } from "lucide-react";
import { MouseEvent } from "react";

export const TIME_INTERVAL = 15;

interface TimeRangePickerProps {
  form: UseFormReturn<AvailabilitySchema, any, AvailabilitySchema>;
  fieldArray: UseFieldArrayReturn<
    AvailabilitySchema,
    | "timeSlots.sunday.timeSlots"
    | "timeSlots.monday.timeSlots"
    | "timeSlots.tuesday.timeSlots"
    | "timeSlots.wednesday.timeSlots"
    | "timeSlots.thursday.timeSlots"
    | "timeSlots.friday.timeSlots"
    | "timeSlots.saturday.timeSlots",
    "id"
  >;
  arrayIndex: number;
  day: DaysTypes;
}

const TimeRangePicker = ({
  form,
  fieldArray,
  arrayIndex,
  day,
}: TimeRangePickerProps) => {
  const deleteRange = (currentIndex: number) => {
    fieldArray.remove(currentIndex);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (arrayIndex === 0) {
      form.setValue(`timeSlots.${day}.available`, false);
      console.log("first one");
    } else {
      deleteRange(arrayIndex);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex grow items-center gap-2">
        <FormField
          control={form.control}
          name={`timeSlots.${day}.timeSlots.${arrayIndex}.startTime` as const}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormControl>
                <DatePicker
                  className="w-full rounded-[5px] border border-[#CDCDCD] px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:w-[99.5px] md:min-w-0 "
                  selected={
                    new Date(
                      form.watch(
                        `timeSlots.${day}.timeSlots.${arrayIndex}.startTime`,
                      ),
                    )
                  }
                  onChange={(date) => {
                    if (date) {
                      console.log("date:", date);
                      form.setValue(
                        `timeSlots.${day}.timeSlots.${arrayIndex}.startTime`,
                        new Date(date).toISOString(),
                      );
                      form.setValue(
                        `timeSlots.${day}.timeSlots.${arrayIndex}.endTime`,
                        new Date(
                          date.getTime() + TIME_INTERVAL * 60000,
                        ).toISOString(),
                      );
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={TIME_INTERVAL}
                  minTime={
                    arrayIndex === 0
                      ? setHours(setMinutes(new Date(), 0), 24)
                      : new Date(
                          form.watch(
                            `timeSlots.${day}.timeSlots.${arrayIndex}.startTime`,
                          ),
                        )
                  }
                  maxTime={setHours(setMinutes(new Date(), 30), 23)}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="font-extrabold text-[5E5E5E]">-</span>
        <FormField
          control={form.control}
          name={`timeSlots.${day}.timeSlots.${arrayIndex}.endTime` as const}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormControl>
                <DatePicker
                  className="w-full rounded-[5px]  border border-[#CDCDCD] px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:w-[99.5px] md:min-w-0 "
                  selected={
                    new Date(
                      form.watch(
                        `timeSlots.${day}.timeSlots.${arrayIndex}.endTime`,
                      ),
                    )
                  }
                  onChange={(date) => {
                    if (date) {
                      console.log("date:", date);
                      form.setValue(
                        `timeSlots.${day}.timeSlots.${arrayIndex}.endTime`,
                        new Date(date).toISOString(),
                      );
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={TIME_INTERVAL}
                  minTime={
                    new Date(
                      new Date(
                        form.watch(
                          `timeSlots.${day}.timeSlots.${arrayIndex}.startTime`,
                        ),
                      ).getTime() +
                        TIME_INTERVAL * 60000,
                    )
                  }
                  maxTime={
                    fieldArray.fields.length - 1 !== arrayIndex
                      ? new Date(
                          form.watch(
                            `timeSlots.${day}.timeSlots.${
                              arrayIndex + 1
                            }.startTime`,
                          ),
                        )
                      : setHours(setMinutes(new Date(), 45), 23)
                  }
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <button type="button" onClick={handleDelete}>
        <Trash color="#5E5E5E" />
      </button>
    </div>
  );
};

export default TimeRangePicker;

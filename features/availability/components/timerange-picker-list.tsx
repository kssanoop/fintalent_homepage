import { Plus } from "lucide-react";
import TimeRangePicker, { TIME_INTERVAL } from "./timerange-picker";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { AvailabilitySchema } from "../schema/availability-schema";
import { DaysTypes } from "@/features/availability/types/types";
import { format } from "date-fns";
import { MouseEvent } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const MAX_END_TIME = "23:45";

interface TimeRangePickerListProps {
  form: UseFormReturn<AvailabilitySchema, any, AvailabilitySchema>;
  day: DaysTypes;
}
const TimeRangePickerList = ({ form, day }: TimeRangePickerListProps) => {
  const [parent] = useAutoAnimate(/* optional config */);

  const fieldArray = useFieldArray({
    control: form.control,
    name: `timeSlots.${day}.timeSlots`,
  });

  const currentNoOfList = fieldArray.fields.length;
  const prevListIndex = currentNoOfList - 1;

  const checkEndOfList = (prevListIndex: number) => {
    if (prevListIndex >= 0) {
      const prevEndTime = form.watch(`timeSlots.${day}.timeSlots`)[
        prevListIndex
      ].endTime;
      const formattedPrevEndTime = format(new Date(prevEndTime), "HH:mm");
      const isEndofList = formattedPrevEndTime === MAX_END_TIME;
      return isEndofList;
    }
    return false;
  };

  const isEndofList = checkEndOfList(prevListIndex);

  const addNewList = (e: MouseEvent<HTMLButtonElement>) => {
    const startTime = new Date(
      form.watch(`timeSlots.${day}.timeSlots`)[prevListIndex].endTime,
    );
    fieldArray.append({
      startTime: startTime.toISOString(),
      endTime: new Date(
        startTime.getTime() + TIME_INTERVAL * 60000,
      ).toISOString(),
    });
  };

  return (
    <div className="flex grow items-start justify-between gap-2.5 md:gap-10">
      <div ref={parent} className="space-y-2 grow">
        {fieldArray.fields.map((field, index) => (
          <TimeRangePicker
            key={field.id}
            form={form}
            fieldArray={fieldArray}
            day={day}
            arrayIndex={index}
          />
        ))}
      </div>
      {!isEndofList && (
        <button type="button" onClick={addNewList}>
          <Plus />
        </button>
      )}
    </div>
  );
};

export default TimeRangePickerList;

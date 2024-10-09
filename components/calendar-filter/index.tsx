import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

interface FilterCalendarProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  interviewDays: Date[];
}

const FilterCalendar = ({
  date,
  setDate,
  interviewDays,
}: FilterCalendarProps) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="flex cursor-pointer items-center gap-1"
      >
        <div>
          Filter by date
          <CalendarIcon className=" h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          modifiers={{ interview: interviewDays }}
          modifiersStyles={{
            interview: {
              color: "#034A9A",
              fontWeight: "700",
              border: "1px solid #034A9A",
              borderRadius: "100%",
            },
            selected: { color: "white" },
          }}
          mode="single"
          selected={date}
          onSelect={(dateValue) => {
            if (dateValue === date) {
              setDate(undefined);
            } else {
              setDate(dateValue);
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
};

export default FilterCalendar;

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/utils/cnHelper";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  fromYear = 1200,
  toYear = new Date().getFullYear() + 1,
  onDateSelect,
  onCancel,
  ...props
}: CalendarProps & {
  onDateSelect: (date: Date) => void;
  onCancel: () => void;
}) {
  const Footer = () => {
    return (
      <div className="flex justify-between gap-4 pt-5">
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent px-[10px] py-3 text-[#171717] hover:bg-primary hover:text-primary-foreground md:w-[120px]",
          )}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={cn(
            buttonVariants({ variant: "gradient" }),
            "px-[10px] py-3 md:w-[120px]",
          )}
          onClick={() => onDateSelect}
        >
          Choose Date
        </button>
      </div>
    );
  };

  return (
    <div className="relative">
      <DayPicker
        captionLayout="dropdown-buttons"
        fromYear={fromYear}
        toYear={toYear}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        footer={<Footer />}
        {...props}
      />
    </div>
  );
}

CustomCalendar.displayName = "Calendar";

export { CustomCalendar };

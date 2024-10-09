import React, { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import CalendarPickerDialog from "./calendar-picker-dialog";

interface DropdownMenuComponentProps {
  setFromDate: Dispatch<SetStateAction<Date>>;
  setToDate: Dispatch<SetStateAction<Date>>;
  fromDate: Date | number;
  toDate: Date | number;
}

const CustomDateItem = ({
  onClick,
  date,
  isSelected,
  fromDate,
  toDate,
}: any) => (
  <DropdownMenuItem
    className={`text-base ${
      isSelected ? " font-medium text-[#171717]" : "font-normal text-[#5E5E5E]"
    } `}
    onClick={onClick}
  >
    {date}
  </DropdownMenuItem>
);

const DropdownMenuComponent = ({
  setFromDate,
  setToDate,
  fromDate,
  toDate,
}: DropdownMenuComponentProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Last 365 Days");

  const dateOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 15 Days",
    "Last 30 Days",
    "Last 60 Days",
    "Last 90 Days",
    "Last 180 Days",
    "Last 365 Days",
  ];

  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    if (date === "Custom Date") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
    let fromDateValue: Date = new Date();
    let toDateValue: Date = new Date();
    switch (date) {
      case "Today":
        setFromDate(new Date());
        setToDate(new Date());
        break;
      case "Yesterday":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 1);
        toDateValue = new Date();
        toDateValue.setDate(toDateValue.getDate() - 1);
        break;
      case "Last 7 Days":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 7);
        toDateValue = new Date();
        break;
      case "Last 15 Days":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 15);
        toDateValue = new Date();
        break;
      case "Last 30 Days":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 30);
        toDateValue = new Date();
        break;
      case "Last 60 Days":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 60);
        toDateValue = new Date();
        break;
      case "Last 90 Days":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 90);
        toDateValue = new Date();
        break;
      case "Last 180 Days":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 180);
        toDateValue = new Date();
        break;
      case "Last 365 Days":
        fromDateValue = new Date();
        fromDateValue.setDate(fromDateValue.getDate() - 365);
        toDateValue = new Date();
        break;
    }
    setFromDate(fromDateValue);
    setToDate(toDateValue);
    // if (date === "Custom Date") {
    //   setSelectedDate(`${String(fromDate)}-${String(toDate)}`);
    // }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-0.5">
            <p className="text-base font-normal text-[#5E5E5E]">
              {selectedDate}
            </p>
            <ChevronDown size={20} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-5 md:mx-9">
          {dateOptions.map((date) => (
            <CustomDateItem
              key={date}
              date={date}
              isSelected={date === selectedDate}
              onClick={() => {
                handleDateSelect(date);
              }}
            />
          ))}

          <div>
            <CustomDateItem
              onClick={() => {
                handleDateSelect("Custom Date");
              }}
              date={"Custom Date"}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <CalendarPickerDialog
        open={showDatePicker}
        setOpen={setShowDatePicker}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
    </>
  );
};

export default DropdownMenuComponent;

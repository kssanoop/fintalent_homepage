import { Calendar as CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import InterviewCard from "./InterviewCard";
import { SelectSingleEventHandler } from "react-day-picker";
import { CustomCalendar } from "./CustomCalendar";
import { useGetInterviewUpcomingCandidate } from "../../api/get-interview-upcoming-candidate";
import { isSameDay } from "date-fns";
import { InterviewData } from "../../schema/interview-data-schema";
import InterviewCardSkeletonLoading from "./skeleton-loading/interview-card-skeleton-loading";
import { Skeleton } from "@/components/ui/skeleton";
// import DynamicHeightContainer from "@/features/chat/candidate/components/DynamicHeightContainer";

const UpcomingInterviews = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect: SelectSingleEventHandler = (selectedDate) => {
    setDate(selectedDate);
  };
  const handleSelectDateButtonClick: SelectSingleEventHandler = (
    selectedDate,
  ) => {
    setDate(selectedDate);
    // setShowCalendar(false);
  };

  const handleClearFilter = () => {
    setDate(undefined);
    setShowCalendar(false);
  };

  function formatDate(dateIso: string | number | Date) {
    const currentDate = new Date();
    const providedDate = new Date(dateIso);

    const oneDay = 24 * 60 * 60 * 1000;

    // If the provided date is today
    if (
      providedDate.getDate() === currentDate.getDate() &&
      providedDate.getMonth() === currentDate.getMonth() &&
      providedDate.getFullYear() === currentDate.getFullYear()
    ) {
      return `Today, ${providedDate.getDate()} ${getMonthName(
        providedDate.getMonth(),
      )}`;
    }

    // If the provided date is tomorrow
    const tomorrowDate = new Date(currentDate.getTime() + oneDay);
    if (
      providedDate.getDate() === tomorrowDate.getDate() &&
      providedDate.getMonth() === tomorrowDate.getMonth() &&
      providedDate.getFullYear() === tomorrowDate.getFullYear()
    ) {
      return `Tomorrow, ${providedDate.getDate()} ${getMonthName(
        providedDate.getMonth(),
      )}`;
    }

    // If the provided date is after tomorrow
    if (providedDate > tomorrowDate) {
      return `${providedDate.getDate()} ${getMonthName(
        providedDate.getMonth(),
      )}, ${providedDate.getFullYear()}`;
    }

    // If none of the above conditions match
    return "Invalid Date";
  }

  function getMonthName(monthIndex: number) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  }

  const { data, isLoading } = useGetInterviewUpcomingCandidate();

  const filteredData = date
    ? data.filter((item: { _id: string | number | Date }) => {
        return isSameDay(new Date(item._id), date);
      })
    : data;

  console.log("Upcoming Interview:", filteredData);
  return (
    <div className="mt-10 flex flex-col gap-3 overflow-hidden px-4 md:mt-7 md:px-5">
      {/* heading */}
      <div className="flex items-center justify-between">
        <div className="text-base font-bold text-[#171717] md:text-lg">
          Upcoming interviews
        </div>
        {date === undefined ? (
          <div
            className="flex cursor-pointer  items-center gap-1"
            onClick={() => {
              setShowCalendar(true);
            }}
          >
            <div className="text-sm font-normal text-[#171717] md:text-base">
              Filter by date
            </div>
            <div className="md:h-6 md:w-6">
              <CalendarIcon size={24} strokeWidth={1.5} color="#171717" />
            </div>
          </div>
        ) : (
          <div
            onClick={handleClearFilter}
            className="cursor-pointer text-base font-normal text-[#E72F2F]"
          >
            Clear filter
          </div>
        )}
      </div>
      {Boolean(showCalendar) && date === undefined && (
        <div className="shadow-overlay">
          <div className="centered-container">
            <CustomCalendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="w-full rounded-md border bg-white"
              // interviewDays={interviewDays}
              onCancel={() => {
                setShowCalendar(false);
              }}
              onDateSelect={() => handleSelectDateButtonClick}
            />
          </div>
        </div>
      )}
      {/* date */}
      {/* <DynamicHeightContainer> */}
      <div className="flex h-full w-full flex-col">
        {isLoading ? (
          <div>
            <Skeleton className="h-6 w-[80px]" />
            <div className="mt-3 grid grid-cols-1 gap-y-[8px] md:grid-cols-2 md:gap-x-[8px] md:gap-y-[13px]">
              {[...Array(4)].map(() => {
                return (
                  <InterviewCardSkeletonLoading
                    section="upcoming"
                    key={crypto.randomUUID()}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          filteredData
            ?.sort(
              (
                a: { _id: string | number | Date },
                b: { _id: string | number | Date },
              ) => new Date(a._id).valueOf() - new Date(b._id).valueOf(),
            )
            ?.map((interviewsData: any, index: number) => {
              return (
                <div className="flex flex-col" key={interviewsData?._id}>
                  <div
                    className={`flex items-center gap-3 ${
                      index === 0 ? "mt-0" : "mt-6"
                    }`}
                  >
                    <div className={`text-base font-normal text-[#171717] `}>
                      {formatDate(interviewsData?.dateIso)}
                    </div>
                    <div
                      className="h-[1px] flex-grow bg-[#E3E3E3]"
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-y-[8px] md:grid-cols-2 md:gap-x-[8px] md:gap-y-[13px] ">
                    {interviewsData?.interviews
                      ?.sort(
                        (a: any, b: any) =>
                          new Date(a._id).valueOf() - new Date(b._id).valueOf(),
                      )
                      ?.map((interview: InterviewData) => (
                        <div className="" key={interview?._id}>
                          <InterviewCard section="upcoming" data={interview} />
                        </div>
                      ))}
                  </div>
                </div>
              );
            })
        )}
        {filteredData?.length === 0 && !isLoading && (
          <div className="flex  items-center justify-center">
            <h1 className="grow text-center text-xl text-brand-blue">
              No Upcoming Interviews to show
            </h1>
          </div>
        )}
      </div>
      {/* </DynamicHeightContainer> */}
    </div>
  );
};

export default UpcomingInterviews;

import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import HeadBar from "@/components/layout/head-bar";
import useGetInterviewsForRecruiter from "@/features/interview/api/get-interviews-for-recruiter";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock3, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { format, isSameDay, isToday, isTomorrow } from "date-fns";
import useDeleteInterviewByrecruiter from "@/features/interview/api/delete-interview";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

// format date to "Today, 12 June" or "Tomorrow, 13 June" or "14 June, 2021", if the current date is 12 June
const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  if (isToday(date)) {
    return `Today, ${format(date, "dd MMMM")}`;
  }

  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, "dd MMMM")}`;
  }

  return format(date, "dd MMMM, yyyy");
};

const FilterCalendar = ({
  date,
  setDate,
  interviewDays,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  interviewDays: Date[];
}) => {
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
            date < new Date() || date < new Date("1900-01-01")
          }
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
};

const Interviews = () => {
  const queryClient = useQueryClient();
  const { showBoundary } = useErrorBoundary();
  const { data, isLoading, isError, error } = useGetInterviewsForRecruiter();
  const [date, setDate] = React.useState<Date | undefined>();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["interviews-for-recruiter"] });
  };
  const handleError = (error: any) => {
    console.log(error);
    toast.error("Something went wrong. Unable to delete.");
  };

  const { mutate: deleteInterview } = useDeleteInterviewByrecruiter(
    handleSuccess,
    handleError,
  );

  if (isError) {
    console.log(error);
    showBoundary(error);
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        {[...Array(10)].map((_, index) => (
          <Card
            key={index}
            className="relative flex h-44 w-full flex-col justify-between p-4 md:w-[calc(50%-6px)]"
          >
            <div className="flex justify-between gap-4">
              <div>
                <Skeleton className="mb-2 h-5 w-20" />
                <Skeleton className="h-[34px] w-36" />
              </div>
              <div>
                <Skeleton className="mb-2 h-5 w-16" />
                <Skeleton className="h-[34px] w-60" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="mb-2 h-6 w-28" />
              <Skeleton className="mb-2 h-10 w-28" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const filteredData = date
    ? data.filter((item) => {
        return isSameDay(new Date(item._id), date);
      })
    : data;

  const handleDeleteInterview = (interviewId: string) => {
    deleteInterview(interviewId);
  };
  // console.log(filteredData);
  const interviewDays = data.map((interview) => new Date(interview._id));
  // console.log(interviewDays);
  // console.log(data);
  return (
    <>
      {filteredData.length === 0 ? (
        <div className="flex  items-center">
          <h1 className="grow text-center text-xl text-brand-blue">
            No Interviews to show
          </h1>

          <FilterCalendar
            date={date}
            setDate={setDate}
            interviewDays={interviewDays}
          />
        </div>
      ) : (
        <div className="space-y-8 text-brand-black">
          {/* sort the values in ascending order of date */}
          {filteredData
            .sort(
              (a, b) => new Date(a._id).valueOf() - new Date(b._id).valueOf(),
            )
            .map((interview, index) => (
              <div key={crypto.randomUUID()}>
                <div className="mb-2.5 flex items-center justify-between">
                  <p>{formatDate(interview._id)}</p>
                  {index === 0 &&
                    (date ? (
                      <p
                        onClick={() => {
                          setDate(undefined);
                        }}
                        className="cursor-pointer text-red-400"
                      >
                        Remove filter
                      </p>
                    ) : (
                      <FilterCalendar
                        date={date}
                        setDate={setDate}
                        interviewDays={interviewDays}
                      />
                    ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {interview.interviews.map((info) => (
                    <Card
                      key={info._id}
                      className="relative flex h-44 w-full flex-col justify-between p-4 md:w-[calc(50%-6px)]"
                    >
                      <Trash
                        onClick={() => {
                          handleDeleteInterview(info._id);
                        }}
                        size={14}
                        className="absolute right-2 top-2 box-content cursor-pointer p-2 text-brand-red"
                      />
                      <div className="flex gap-[130px]">
                        <div>
                          <p className="mb-2 text-sm text-brand-grey">
                            Meeting with
                          </p>
                          <div className="flex items-center gap-1.5">
                            <Avatar className="h-[34px] w-[34px]">
                              <AvatarImage
                                src={`${process.env.NEXT_PUBLIC_IMG_URL}${info.candidate.profilePhoto.storageName}`}
                              />
                              <AvatarProfileFallback />
                            </Avatar>
                            <h5 className="line-clamp-1 text-lg font-bold">
                              {info.candidate.fullName}{" "}
                            </h5>
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-sm text-brand-grey">for</p>
                          <h5 className="line-clamp-1 break-all text-lg font-medium capitalize text-brand-grey">
                            {info.job.jobTitle}{" "}
                          </h5>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[5px]">
                          {" "}
                          <Clock3 size={16} strokeWidth={1.5} color="#A9A9A9" />
                          {format(new Date(info.startDateTime), "HH:mm")} -{" "}
                          {format(
                            new Date(
                              new Date(info.startDateTime).setMinutes(
                                new Date(info.startDateTime).getMinutes() + 30,
                              ),
                            ),
                            "HH:mm",
                          )}
                        </div>
                        <Link href={info.interviewUrl} target="_blank">
                          <Button
                            variant="outline"
                            className=" w-28 rounded border-[#CDCDCD]"
                          >
                            Join now
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

Interviews.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar heading="Interviews" />
          <ErrorBoundary
            fallback={
              <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
                Something went wrong! Unable to fetch data.
              </div>
            }
            onError={(error: any, errorInfo) => {
              console.log("Error caught!", error);
            }}
          >
            <div className="scroll-container grow overflow-y-auto px-2 py-3 md:p-5 ">
              {page}
            </div>
          </ErrorBoundary>
        </div>
      </Layout>
    </Authorization>
  );
};

export default Interviews;

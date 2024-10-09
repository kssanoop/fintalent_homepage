import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import { Calendar as CalenderIcon, Clock3, Dot } from "lucide-react";
import Link from "next/link";
import { InterviewData } from "../../schema/interview-data-schema";
import AcceptDialogPopup from "./interview-popups/accept-dialog-popup";
import RejectDialogPopup from "./interview-popups/reject-dialog-popup";
import RescheduleDialogPopup from "./interview-popups/reschedule-dialog-popup";
import { truncate } from "lodash";

interface Props {
  section: string;
  data: InterviewData;
}
const InterviewCard = ({ section, data }: Props) => {
  const [reschedulePopupOpen, setReschedulePopupOpen] = useState(false);
  const [acceptPopupOpen, setAcceptPopupOpen] = useState(false);
  const [rejectPopupOpen, setRejectPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // console.log("data received on interview card:", data);

  const { company, recruiter, startDateTime, job, duration, _id } = data || {};
  const formattedDate = new Date(startDateTime).getDate();
  const formattedMonth = new Date(startDateTime).toLocaleString("en-US", {
    month: "long",
  });

  const handleDateTimeFormat = () => {
    const startDate = new Date(startDateTime);
    const durationInMinutes = duration;

    // Calculate end time
    const endDate = new Date(
      startDate.getTime() + durationInMinutes * 60 * 1000,
    );

    // Format start time
    const startHours = startDate.getHours() % 12 || 12;
    const startMinutes = startDate.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const startAmPM = startDate.getHours() >= 12 ? "pm" : "am";

    // Format end time
    const endHours = endDate.getHours() % 12 || 12;
    const endMinutes = endDate.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const endAmPM = endDate.getHours() >= 12 ? "pm" : "am";

    // Return the formatted date and time range
    return `${startHours}:${startMinutes} ${startAmPM} - ${endHours}:${endMinutes} ${endAmPM}`;
  };
  console.log("isMobile", isMobile);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Card
        className={`w-full  grow px-5 pb-[17px] pt-[17px] md:pb-5 md:pt-[19px] ${
          section === "dashboard" ? "w-full" : "w-full"
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <CardIcon>
              <CardIconImage
                src={`${process?.env?.NEXT_PUBLIC_IMG_URL}${company?.companyLogo?.storageName}`}
              />
              <CardIconFallback>{company?.companyName}</CardIconFallback>
            </CardIcon>
            <div className="flex flex-col">
              <CardTitle
                className={`${
                  section === "dashboard" ? "line-clamp-1" : "line-clmap-2"
                } flex-wrap text-ellipsis text-lg`}
              >
                {truncate(job?.jobTitle, {
                  length: isMobile ? 30 : 50,
                  omission: "...",
                })}
              </CardTitle>
              <div
                className={`items-center gap-2  ${
                  section !== "dashboard" ? "hidden md:flex" : "flex"
                }`}
              >
                <div className="whitespace-nowrap text-sm font-normal text-[#5E5E5E]">
                  at{" "}
                  {truncate(company?.companyName, {
                    length: isMobile ? 12 : 30,
                    omission: ".",
                  })}
                </div>
                <div>
                  <Dot size={8} color="#A9A9A9" strokeWidth={9} />
                </div>
                <div className="line-clamp-1 text-ellipsis text-sm font-normal  text-[#5E5E5E]">
                  {truncate(recruiter?.fullName, {
                    length: isMobile ? 15 : 30,
                    omission: "...",
                  })}{" "}
                  invited you
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 whitespace-nowrap ${
              section === "dashboard" ? "hidden md:hidden" : "md:hidden"
            }`}
          >
            <div className="text-sm font-normal text-[#5E5E5E]">
              at {truncate(company?.companyName, { length: 12, omission: "." })}
            </div>
            <div>
              <Dot size={8} color="#A9A9A9" strokeWidth={9} />
            </div>
            <div className="text-sm font-normal text-[#5E5E5E]">
              {truncate(`${recruiter?.fullName} invited you`, {
                length: 30,
                omission: "...",
              })}
            </div>
          </div>
        </div>
        {/* time/date */}
        <div
          className={`flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-9 ${
            section === "dashboard" ? "pt-5" : "pt-6 md:pt-7"
          }`}
        >
          <div className="flex flex-col gap-[11px]">
            {section === "Request" ? (
              <div className="flex items-center gap-1">
                {/* icon */}
                <div>
                  <CalenderIcon size={24} strokeWidth={1.5} color="#A9A9A9" />
                </div>

                {/* date */}
                <div className="text-base font-normal text-[#5E5E5E]">
                  {formattedDate} {""} {formattedMonth}
                </div>
              </div>
            ) : null}
            <div className="flex items-center gap-1">
              {/* icon */}
              <div>
                <Clock3
                  size={section === "dashboard" ? 18 : 24}
                  strokeWidth={1.5}
                  color="#A9A9A9"
                />
              </div>
              {/* time */}
              <div className="text-base font-normal text-[#5E5E5E]">
                {handleDateTimeFormat()}
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className="flex flex-wrap md:items-end">
            {section === "Request" ? (
              <div className="flex gap-2">
                {/*  Reschedule button */}
                <Button
                  className="border-border bg-[#F7F7F7] text-sm font-bold hover:text-[#034A9A] md:w-[121px]"
                  variant={"outline"}
                  onClick={() => {
                    setReschedulePopupOpen(true);
                  }}
                >
                  Reschedule
                </Button>

                {/* Decline button */}
                <Button
                  className="border border-border bg-[#FFEDED] text-sm font-bold text-[#E72F2F] hover:text-[#E72F2F] md:w-[91px]"
                  variant={"outline"}
                  onClick={() => {
                    setRejectPopupOpen(true);
                  }}
                >
                  Decline
                </Button>

                {/* Accept button */}
                <Button
                  className="w-[88px] border border-border text-sm font-bold"
                  variant={"success"}
                  onClick={() => {
                    setAcceptPopupOpen(true);
                  }}
                >
                  Accept
                </Button>
              </div>
            ) : (
              section !== "dashboard" && (
                <Button
                  className="flex-grow border-border bg-[#F7F7F7] text-sm font-bold text-[#012A59] hover:text-[#012A59] md:flex-grow-0"
                  variant={"outline"}
                >
                  <Link href={data?.interviewUrl} target="_blank">
                    Join now
                  </Link>
                </Button>
              )
            )}
          </div>
        </div>
      </Card>
      <AcceptDialogPopup
        open={acceptPopupOpen}
        setOpen={setAcceptPopupOpen}
        companyName={company?.companyName}
        JobTitle={job?.jobTitle}
        InterviewId={_id}
      />
      <RejectDialogPopup
        open={rejectPopupOpen}
        setOpen={setRejectPopupOpen}
        companyName={company?.companyName}
        JobTitle={job?.jobTitle}
        InterviewId={_id}
      />
      <RescheduleDialogPopup
        open={reschedulePopupOpen}
        setOpen={setReschedulePopupOpen}
        recruiterName={recruiter?.fullName}
        chatId={data.chat?._id}
      />
    </>
  );
};

export default InterviewCard;

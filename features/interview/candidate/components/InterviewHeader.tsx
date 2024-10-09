import React from "react";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import NotificationButton from "@/components/notification/notification-button";

interface InterviewHeaderProps {
  countofInterviewRequest: string;
}
const InterviewHeader = ({ countofInterviewRequest }: InterviewHeaderProps) => {
  return (
    <div className="flex w-full gap-2 border-b border-border p-5 md:border-none md:p-0 md:px-5 md:pt-5">
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      <div className="flex w-full basis-full flex-col gap-1 md:gap-2">
        <div className="flex basis-full justify-between">
          <h1 className="text-xl font-bold text-[#171717]">Interviews</h1>

          <NotificationButton />
        </div>
        {Number(countofInterviewRequest) > 0 && (
          <div className="text-base font-medium text-[#5E5E5E]">
            <span className="text-sm font-semibold text-[#171717] md:text-base md:font-bold">
              {countofInterviewRequest} new
            </span>{" "}
            interview requests
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewHeader;

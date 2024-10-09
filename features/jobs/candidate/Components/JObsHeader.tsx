import NotificationButton from "@/components/notification/notification-button";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import React from "react";

interface JObsHeaderProps {
  offerNumber: number;
}

const   JObsHeader = ({ offerNumber }: JObsHeaderProps) => {
  return (
    <div className="flex gap-2 border-b border-border p-5 md:border-none md:p-0 md:px-6 md:pt-5">
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      <div className="flex w-full flex-col gap-1 md:gap-2">
        <div className="flex justify-between ">
          <h1 className="text-xl font-bold text-[#171717] md:text-2xl">Jobs</h1>
          <NotificationButton />
        </div>
        {offerNumber > 0 && (
          <div className="text-sm font-semibold text-[#5E5E5E] md:text-base md:font-medium">
            You are invited to {""}
            <span className="text-sm font-semibold text-[#171717] md:text-base md:font-bold">
              {offerNumber} new jobs{""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JObsHeader;

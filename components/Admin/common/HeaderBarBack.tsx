import NotificationButton from "@/components/notification/notification-button";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import { cn } from "@/utils/cnHelper";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

interface HeaderBarBackProps {
  heading: string;
  className?: string;
}

const HeaderBarBack = ({ heading, className }: HeaderBarBackProps) => {
  const router = useRouter();

  // back to previous page
  const handleBackButtonClick = () => {
    router.back();
  };
  return (
    <div className={cn("h-[62px] w-full bg-white px-5 py-5", className)}>
      {/* icon */}
      <div className="hidden justify-between lg:flex">
        <div
          className="hidden cursor-pointer items-center gap-3 lg:flex"
          onClick={() => {
            handleBackButtonClick();
          }}
        >
          <ChevronLeft color="#5E5E5E" size={21} />
          <div className="text-xl font-bold text-[#171717]">{heading}</div>
        </div>
        <NotificationButton />
      </div>

      <div className="flex items-center gap-2 text-xl font-bold text-[#171717] lg:hidden">
        <MobileSidebar />
        <ChevronLeft
          color="#5E5E5E"
          size={17}
          className="cursor-pointer"
          onClick={() => {
            handleBackButtonClick();
          }}
        />
        <div className=" text-xl font-bold text-[#171717]">{heading}</div>
      </div>
    </div>
  );
};

export default HeaderBarBack;

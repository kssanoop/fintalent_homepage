"use-client";

import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface PropsDataCard {
  info: any;
  section: string;
}

const ProfileInsightCard = ({ info, section }: PropsDataCard) => {
  const router = useRouter();
  const pathname = usePathname();
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function numberToKFormat(number: number) {
    if (screenWidth > 768) {
      return number;
    } else {
      if (number >= 1000) {
        let divisions = 0;
        while (number >= 1000) {
          number /= 1000;
          divisions++;
        }

        const formattedNumber =
          divisions === 1
            ? `${number.toFixed(1)}k`
            : divisions === 2
            ? `${number.toFixed(1)}M`
            : divisions === 3
            ? `${number.toFixed(1)}B`
            : `${number}`;

        return formattedNumber;
      } else {
        return number.toString();
      }
    }
  }

  return (
    <Card
      onClick={() => {
        if (info.redirect) router.push(`${pathname}${info.redirect}`);
      }}
      className={`w-full flex-grow ${
        info.redirect && "cursor-pointer hover:shadow"
      } gap-3 rounded-lg border border-solid border-[#E9E9E9] bg-white p-3 lg:p-5`}
    >
      <div
        className={`flex ${
          section === "recruiter" ? "flex-row" : "flex-col"
        } items-start gap-3 lg:flex-row lg:items-center`}
      >
        <div
          className={`${
            section === "recruiter" ? "h-[52px] w-[52px]" : "h-10 w-10"
          } items-center justify-center rounded lg:h-14 lg:w-14 ${
            section !== "profile" && section !== "recruiter" ? "hidden" : "flex"
          }`}
          style={{ backgroundColor: info.color }}
        >
          {info.icon}
        </div>
        <div
          className={`flex ${
            section === "profile" ||
            section === "platform" ||
            section === "recruiter"
              ? "flex-col"
              : "flex-col lg:flex-row"
          } gap-1 ${section === "lpa" && "items-start lg:items-center"}`}
        >
          <h2
            className={`${
              section === "lpa" ? "text-xl" : "text-xl lg:text-2xl"
            } font-bold text-[#000000]`}
          >
            {numberToKFormat(info.value)}
          </h2>
          <h4
            className={`${
              section === "lpa"
                ? "text-xs lg:text-sm"
                : "text-xs lg:whitespace-nowrap lg:text-base"
            } font-normal text-[#5E5E5E]`}
          >
            {info.name}
          </h4>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInsightCard;

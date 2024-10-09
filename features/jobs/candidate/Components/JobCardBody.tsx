import AvatarCompanyFallback from "@/components/avatar-company-fallback";
import { CardTitle } from "@/components/ui/card";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import _ from "lodash";
import { Briefcase, Dot, IndianRupee, MapPin } from "lucide-react";
import React from "react";

interface Props {
  popup: boolean;
  section?: string;
  selectedTab?: string;
  data?: any;
}

const changeToUpper = (arr: string[]) =>
  arr.map((value) => _.startCase(value)).join(", ");

const JobCardBody = ({ popup, section, selectedTab, data }: Props) => {
  const { jobId, companyId, interviewId } = data || {};
  const {
    jobTitle,
    jobType,
    jobDescription,
    jobLocation,
    maxSalary,
    minSalary,
    employmentMode,
  } = jobId || {};

  const { companyLogo, companyName } = companyId || {};

  console.log("Job Description:", data);

  const truncate = (description: string, maxLength: number) => {
    return description?.length > maxLength
      ? description?.substring(0, maxLength)
      : description;
  };

  // handle interview Date Time Show

  const handleDateTimeFormat = () => {
    if (interviewId !== null) {
      const startDateTime = interviewId.startDateTime;
      const startDate = new Date(startDateTime);

      // Extract date components
      const year = startDate.getFullYear();
      const month = startDate.toLocaleString("en-US", { month: "short" });
      const day = startDate.getDate();

      // Extract time components
      const hours = startDate.getHours();
      const minutes = startDate.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      // Determine if it's AM or PM
      const amPM = hours >= 12 ? "pm" : "am";

      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12;

      // Return the formatted date and time
      return `${day} ${month}, ${year}. ${formattedHours}:${minutes}${amPM}`;
    }

    // Return null if interviewId is null
    return null;
  };
  console.log(interviewId?.active, data.showInterview);

  return (
    <div className={`flex flex-col gap-3 break-all`}>
      {/* icon */}
      <div className="flex flex-col gap-5">
        <div className="flex w-full gap-2 md:gap-4">
          <CardIcon>
            <CardIconImage
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${companyLogo?.storageName}`}
            />
            <AvatarCompanyFallback />
          </CardIcon>
          {/* desktop */}
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-2">
                {/* card title */}
                <div className="flex flex-col items-start gap-1 text-base font-normal text-[#5E5E5E] md:flex-row">
                  <CardTitle className="text-base font-bold text-[#171717]">
                    {jobTitle}
                  </CardTitle>
                  <div>at {companyName}</div>
                </div>
              </div>
              {/* notice / message */}
              {!popup &&
                // interviewId !== null &&
                section === "JobsTabs" &&
                selectedTab === "interViewScheduled" &&
                data.showInterview &&
                !!interviewId &&
                interviewId.active && (
                  <div className=" hidden items-center rounded-[8px] bg-[#DEAC2B29] p-2 md:flex">
                    <div>
                      <Dot size={24} strokeWidth={8} color="#DEAC2B" />
                    </div>
                    <div>
                      <h3 className="text-base font-normal text-[#5E5E5E]">
                        Interview scheduled on{" "}
                        <span className="font-bold text-[#171717]">
                          {handleDateTimeFormat()}
                        </span>
                      </h3>
                    </div>
                  </div>
                )}
            </div>
            {/* job details */}
            <div className="hidden flex-wrap gap-x-[19px] gap-y-2 md:flex">
              {/* job type */}
              <div className="flex gap-1">
                <Briefcase size={19} strokeOpacity={1} color="#5E5E5E" />
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobType ? changeToUpper(jobType) : "",
                  }}
                  className="text-start text-sm font-medium text-[#5E5E5E]"
                ></div>
              </div>
              {/* job payment */}
              <div className="flex gap-1">
                <IndianRupee size={19} strokeOpacity={1} color="#5E5E5E" />
                <div className="whitespace-nowrap text-sm font-medium text-[#5E5E5E]">
                  {minSalary} - {maxSalary} LPA
                </div>
              </div>
              {/* location */}
              <div className="flex gap-1">
                <MapPin size={19} strokeOpacity={1} color="#5E5E5E" />
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobLocation
                      ? truncate(_.upperFirst(jobLocation), 20)
                      : "",
                  }}
                  style={{ wordBreak: "break-word" }}
                  className="break-words text-start text-sm font-medium text-[#5E5E5E]"
                ></div>
              </div>
              {/* job type */}
              {popup && (
                <div className="flex gap-1">
                  <Briefcase size={19} strokeOpacity={1} color="#5E5E5E" />
                  <div
                    style={{ wordBreak: "break-word" }}
                    className="text-sm font-medium text-[#5E5E5E]"
                  >
                    {_.startCase(employmentMode)}
                  </div>
                </div>
              )}
            </div>
            {!popup && (
              <div
                className={`${
                  section === "JobsTabs"
                    ? "line-clamp-2 h-[72px]"
                    : "line-clamp-3 h-[76px]"
                } hidden grow pt-1 text-start text-sm font-medium leading-6 text-[#5E5E5E] md:block`}
              >
                {jobDescription}
              </div>
            )}
          </div>
        </div>
        {popup && (
          <div className="scroll-container hidden space-y-2 text-start text-sm font-medium leading-6 text-[#5E5E5E] md:block">
            <h4 className="text-xs font-bold text-brand-grey">DESCRIPTION</h4>
            <p>{jobDescription}</p>
          </div>
        )}
      </div>

      {/* mobile */}
      {/* notice / message */}
      {!popup &&
        section === "JobsTabs" &&
        selectedTab === "interViewScheduled" &&
        data.showInterview &&
        interviewId !== null &&
        interviewId.active && (
          <div className="mt-1 flex items-center rounded-[8px] bg-[#DEAC2B29] p-2 md:hidden">
            <div>
              <Dot size={24} strokeWidth={8} color="#DEAC2B" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-[#5E5E5E]">
                Interview scheduled on <br />
                <span className="text-sm font-medium text-[#171717]">
                  {handleDateTimeFormat()}
                </span>
              </h3>
            </div>
          </div>
        )}
      {/* job details */}
      <div className="mt-1 flex flex-wrap gap-4 md:hidden">
        {/* job type */}
        <div className="flex gap-1">
          <Briefcase size={19} strokeOpacity={1} color="#5E5E5E" />
          <div
            style={{ wordBreak: "break-word" }}
            className="text-start text-sm font-medium text-[#5E5E5E]"
          >
            {truncate(changeToUpper(jobType), 10)}
          </div>
        </div>
        {/* job payment */}
        <div className="flex gap-1">
          <IndianRupee size={19} strokeOpacity={1} color="#5E5E5E" />
          <div className="text-sm font-medium text-[#5E5E5E]">
            {minSalary}-{maxSalary} LPA
          </div>
        </div>
        {/* location */}
        <div className="flex gap-1">
          <MapPin size={19} strokeOpacity={1} color="#5E5E5E" />
          <div
            style={{ wordBreak: "break-word" }}
            className="text-sm font-medium text-[#5E5E5E]"
          >
            {truncate(jobLocation, 9)}
          </div>
        </div>
        {/* job type */}
        {popup && (
          <div className="flex gap-1">
            <Briefcase size={19} strokeOpacity={1} color="#5E5E5E" />
            <div className="text-sm font-medium text-[#5E5E5E]">
              {employmentMode}
            </div>
          </div>
        )}
      </div>
      {popup ? (
        <div
          style={{ wordBreak: "break-word" }}
          className="space-y-2 text-start text-sm font-medium leading-6 text-[#5E5E5E] md:hidden"
        >
          <h4 className="text-xs font-bold text-brand-grey">DESCRIPTION</h4>

          <p>{jobDescription}</p>
        </div>
      ) : (
        <div
          style={{ wordWrap: "break-word" }}
          className="line-clamp-5 h-[120px] text-start text-sm font-medium leading-6 text-[#5E5E5E] md:hidden"
        >
          {truncate(jobDescription, 220)}
        </div>
      )}
    </div>
  );
};

export default JobCardBody;

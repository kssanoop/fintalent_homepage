import BriefCase from "@/components/svg/brief-case";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { capitalize, startCase } from "lodash";
import { ChevronDown, IndianRupee, MapPin } from "lucide-react";
import React from "react";

interface TriggeredCardHeaderProps {
  isOpen: boolean;
  data: JobApplicationSchema;
}

const TriggeredCardHeader = ({ isOpen, data }: TriggeredCardHeaderProps) => {
  console.log("jobs header:", data);
  const { jobId, companyId, status } = data;
  const jobTypes = jobId?.jobType?.map(capitalize).join(", ");
  const JobDetails = [
    {
      id: 1,
      value: jobTypes ?? "Not-specified",
      icon: <BriefCase />,
    },
    {
      id: 2,
      value:
        `${jobId?.minSalary} LPA - ${jobId?.maxSalary} LPA` ?? "Not-specified",
      icon: <IndianRupee size={16} color="#5E5E5E" />,
    },
    {
      id: 3,
      value: companyId?.locations?.join(",") ?? "Not-specified",
      icon: <MapPin size={19} color="#5E5E5E" />,
    },
  ];
  return (
    <div className="flex justify-between px-5 py-5 transition-all">
      <div className="flex gap-4" style={{ flexBasis: "0 0 90%" }}>
        <div>
          <CardIcon>
            <CardIconImage
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${companyId?.companyLogo?.storageName}`}
            />
            <CardIconFallback>{companyId?.companyName}</CardIconFallback>
          </CardIcon>
        </div>
        <div className="flex gap-20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-[#171717]">
                {jobId?.jobTitle}
              </h4>
              <p className=" text-sm font-medium text-[#5E5E5E]">
                at {companyId?.companyName}
              </p>
            </div>
            {/* icons  */}
            <div className="flex gap-[19px]">
              {JobDetails?.map((item) => (
                <div
                  className="flex items-center gap-1"
                  key={crypto.randomUUID()}
                >
                  {item?.icon}
                  <p className="text-sm font-normal text-[#5E5E5E]">
                    {item.id === 2 || item?.id === 1
                      ? item?.value
                      : startCase(item?.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-16">
        <div className="flex w-[166px] flex-col items-start gap-1">
          <p className="text-sm font-normal text-[#171717]">
            Current status :{" "}
          </p>
          <p className="text-base font-bold text-[#171717]">
            {startCase(status)}
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 ${
            isOpen && "rotate-180"
          } shrink-0 transition-transform duration-200`}
        />
      </div>
    </div>
  );
};

export default TriggeredCardHeader;

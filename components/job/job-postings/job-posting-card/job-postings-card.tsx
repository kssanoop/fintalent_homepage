import AvatarCompanyFallback from "@/components/avatar-company-fallback";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import { Job } from "@/features/jobs/schema/all-jobs-schema";
import { experienceLevelOptions } from "@/lib/constants/input-options";
import { formatDistanceToNow } from "date-fns";
import _ from "lodash";
import { Briefcase, ChevronRight, IndianRupee, MapPin } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

export type JobPostingsCardProps = {
  jobDetails: Job;
  Interface?: string;
};

const JobPostingsCard = forwardRef(
  ({ jobDetails, Interface }: JobPostingsCardProps, ref: any) => {
    return (
      <Link href={`/${Interface}/jobs/${jobDetails?._id}`}>
        <Card
          ref={ref}
          className="mb-3 flex flex-col gap-3 break-all p-6 transition ease-in hover:cursor-pointer hover:shadow-lg md:mb-1"
        >
          <div className="flex gap-2 md:gap-4">
            <CardIcon>
              <CardIconImage
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${jobDetails?.companyId?.companyLogo?.storageName}`}
              />
              <AvatarCompanyFallback />
            </CardIcon>
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-2">
                  {/* card title */}
                  <div className="md;justify-between flex w-full flex-col gap-1 font-normal text-[#5E5E5E] md:flex-row md:items-center">
                    <CardTitle className="text-base font-bold text-[#171717]">
                      {jobDetails.jobTitle}
                    </CardTitle>
                    <p className="text-sm font-medium">
                      <span className="hidden md:inline">.</span>{" "}
                      {
                        experienceLevelOptions.find(
                          (option) =>
                            option.slug === jobDetails.experianceLevel,
                        )?.name
                      }
                    </p>
                  </div>
                </div>
                {jobDetails.jobStatus === "hold" && (
                  <Badge
                    variant="yellow"
                    className="shrink-0 font-medium text-brand-black"
                  >
                    on hold
                  </Badge>
                )}
                {jobDetails.jobStatus === "closed" && (
                  <Badge variant="red" className="shrink-0 font-medium">
                    Closed
                  </Badge>
                )}
                {jobDetails.jobStatus === "open" && (
                  <Badge variant="green" className="shrink-0 font-medium">
                    Hiring
                  </Badge>
                )}
              </div>
              {/* job details */}
              <div className="hidden gap-[19px] md:flex">
                <p className="whitespace-nowrap text-sm font-medium capitalize text-[#5E5E5E]">
                  {formatDistanceToNow(new Date(jobDetails.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                {/* job type */}
                <div className="flex gap-1">
                  <Briefcase size={19} strokeOpacity={1} color="#5E5E5E" />
                  <div className="line-clamp-1 whitespace-nowrap text-sm font-medium capitalize text-[#5E5E5E]">
                    {/* {_.startCase(jobDetails.jobType.join(", "))} */}
                    {jobDetails.jobType
                      .map((jobType) => _.startCase(jobType))
                      .join(", ")}
                  </div>
                </div>
                {/* job payment */}
                <div className="flex gap-1">
                  <IndianRupee size={19} strokeOpacity={1} color="#5E5E5E" />
                  <div className="whitespace-nowrap text-sm font-medium text-[#5E5E5E]">
                    {jobDetails.minSalary} - {jobDetails.maxSalary} LPA
                  </div>
                </div>
                {/* location */}
                <div className="flex gap-1 break-all">
                  <MapPin
                    size={19}
                    strokeOpacity={1}
                    color="#5E5E5E"
                    className=" shrink-0"
                  />
                  <div className=" text-sm font-medium capitalize text-[#5E5E5E]">
                    {jobDetails.jobLocation}
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <div className="hidden  grow pt-1 text-start text-sm font-medium leading-6 text-[#5E5E5E] md:line-clamp-2">
                  {jobDetails.jobDescription}
                </div>
                <ChevronRight className="hidden min-h-[24px] min-w-[24px] md:block" />
              </div>
            </div>
          </div>

          {/* job details */}
          <div className="mt-1 flex flex-wrap gap-[19px] md:hidden ">
            <p className="w-[calc(50%-10px)] whitespace-nowrap text-sm font-medium capitalize text-[#5E5E5E]">
              {formatDistanceToNow(new Date(jobDetails.createdAt), {
                addSuffix: true,
              })}
            </p>
            {/* job type */}
            <div className="flex w-[calc(50%-10px)] gap-1">
              <Briefcase size={19} strokeOpacity={1} color="#5E5E5E" />
              <div className="whitespace-nowrap text-sm font-medium text-[#5E5E5E]">
                {jobDetails.jobType
                  .map((jobType) => _.startCase(jobType))
                  .join(", ")}
              </div>
            </div>
            {/* job payment */}
            <div className="flex w-[calc(50%-10px)] gap-1">
              <IndianRupee size={19} strokeOpacity={1} color="#5E5E5E" />
              <div className="whitespace-nowrap text-sm font-medium text-[#5E5E5E]">
                {jobDetails.minSalary} - {jobDetails.maxSalary} LPA
              </div>
            </div>
            {/* location */}
            <div className="flex w-[calc(50%-10px)] gap-1">
              <MapPin size={19} strokeOpacity={1} color="#5E5E5E" />
              <div className=" break-all text-sm font-medium text-[#5E5E5E]">
                {jobDetails.jobLocation}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="line-clamp-2 text-start text-sm  font-medium leading-6 text-[#5E5E5E] md:hidden">
              {jobDetails.jobDescription}
            </div>
            <ChevronRight className=" min-h-[24px] min-w-[24px] md:hidden" />
          </div>
        </Card>
      </Link>
    );
  },
);

JobPostingsCard.displayName = "JobPostingsCard";

export default JobPostingsCard;

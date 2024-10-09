import { Card, CardTitle } from "@/components/ui/card";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import { Checkbox } from "@/components/ui/checkbox";
import { Job } from "@/features/jobs/schema/all-jobs-schema";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, IndianRupee, MapPin } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const InviteToJobCard = ({
  jobDetails,
  setSelectedJobs,
}: {
  jobDetails: Job;
  setSelectedJobs: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleCheckboxChange = (jobId: string) => {
    setSelectedJobs((prev) => [...prev, jobId]);
  };

  return (
    <Card className="mb-3 flex flex-col gap-3 break-all p-6 md:mb-2">
      <div className="flex gap-2 md:gap-4">
        <Checkbox
          onCheckedChange={() => {
            handleCheckboxChange(jobDetails._id);
          }}
          className="rounded-[2px] data-[state=checked]:border-0 data-[state=unchecked]:border-[#A9A9A9]"
        />
        <CardIcon>
          <CardIconImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${jobDetails.companyId.companyLogo.storageName}`}
          />
          <CardIconFallback>CN</CardIconFallback>
        </CardIcon>
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2">
              {/* card title */}
              <div className="flex w-full justify-between gap-1 text-base font-normal text-[#5E5E5E] md:flex-row">
                <CardTitle className="text-base font-bold text-[#171717]">
                  {jobDetails.jobTitle}
                </CardTitle>
              </div>
            </div>
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
              <div className="whitespace-nowrap text-sm font-medium capitalize text-[#5E5E5E]">
                {jobDetails.jobType[0]}
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
              <MapPin size={19} strokeOpacity={1} color="#5E5E5E" />
              <div className=" text-sm font-medium capitalize text-[#5E5E5E]">
                {jobDetails.jobLocation}
              </div>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div className="line-clamp-2 hidden h-[56px] grow pt-1 text-start text-sm font-medium leading-6 text-[#5E5E5E] md:block">
              {jobDetails.jobDescription}
            </div>
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
            {jobDetails.jobType}
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
      <div className="line-clamp-2 h-[56px] text-start text-sm  font-medium leading-6 text-[#5E5E5E] md:hidden">
        {jobDetails.jobDescription}
      </div>
    </Card>
  );
};

export default InviteToJobCard;

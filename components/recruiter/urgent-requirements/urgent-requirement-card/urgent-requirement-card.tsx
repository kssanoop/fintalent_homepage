import { Card } from "@/components/ui/card";
import { TagsDataType } from "@/features/tags/recruiter/api/recruiter/type/tags-data-type";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { formatPostedAt } from "../../Dashboard/tags-card/tags-card-dashboard";

interface UrgentRequirementCardProps {
  data: TagsDataType;
}

const UrgentRequirementCard = ({ data }: UrgentRequirementCardProps) => {
  const route = useRouter();
  const TagId = data?._id;
  const pathName = usePathname();
  const handleRedirect = () => {
    if (!pathName.includes(`${TagId}`)) {
      route.push(`${pathName}/${TagId}`);
    }
  };

  return (
    <Card
      className={`flex ${
        pathName !== `${pathName}/${TagId}` ? "cursor-pointer" : " cursor-auto"
      } ${data.docStatus === "inactive" && "bg-[#EFEFEF]"} flex-col gap-4 p-4`}
      onClick={() => {
        handleRedirect();
      }}
    >
      <div className="flex items-center gap-[5px]">
        <h3 className="text-lg font-extrabold leading-[27px] text-[#171717]">
          {data?.tagCode}
        </h3>
        <div className="hidden h-6 w-[1px] bg-[#A9A9A9] md:flex" />
        <h3 className="text-lg font-extrabold leading-[27px] text-[#171717]">
          {data?.jobTitle}
        </h3>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-sm font-normal leading-[21px] text-[#171717]">
          {data?.location}
        </p>
        <div className="h-1 w-1 rounded-full bg-[#A9A9A9]" />
        <p className="text-sm font-normal leading-[21px] text-[#171717]">
          {data?.experienceLevel === "fresher"
            ? data?.experienceLevel?.replace(/^\w/, (c) => c.toUpperCase())
            : `${data?.experienceLevel} experience`}
        </p>
      </div>
      {/* skills */}
      <p className="text-sm font-normal leading-[21px]">
        Skills needed :{" "}
        <span className="font-bold -tracking-[0.28px] ">
          {data?.skills && data.skills.length > 0 && data.skills.join(", ")}
        </span>
      </p>
      <p>
        Qaulifications needed :{" "}
        <span className="font-bold -tracking-[0.28px] ">
          {data?.qualifications &&
            data.qualifications.length > 0 &&
            data.qualifications.join(", ")}
        </span>
      </p>
      {/* details */}
      <p className="text-sm font-normal leading-[21px] text-[#171717]">
        {data?.other}
      </p>
      <div className="flex flex-wrap justify-between  md:flex-nowrap">
        <p className="text-sm font-normal leading-[21px] text-[#5E5E5E]">
          {formatPostedAt(data?.createdAt)}
        </p>
        <p className="text-sm font-normal leading-[21px] text-[#5E5E5E]">
          <span className=" font-extrabold text-[#171717]">
            {data?.candidateCount}
          </span>{" "}
          candidates needed
        </p>
        {/* <div className="rounded-sm bg-[#EFEFEF] px-2 py-1">
          <p className="text-sm font-normal text-[#5E5E5E]">Pending</p>
        </div> */}
        <div className="mt-4 flex items-center gap-1 md:mt-0">
          <p
            className={`text-sm font-bold leading-[21px] ${data.docStatus === "inactive" ? "text-brand-grey" : "text-[#00BA70]"}`}
          >
            {data?.candidateIds?.length} candidates added
          </p>{" "}
          <ChevronRight
            size={22}
            color={data.docStatus === "inactive" ? "#5E5E5E" : `#00BA70`}
          />
        </div>
      </div>
    </Card>
  );
};

export default UrgentRequirementCard;

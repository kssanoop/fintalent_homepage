import { Card } from "@/components/ui/card";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import React from "react";
import { TagsInfo } from "@/features/tags/type/tags-info";
import _ from "lodash";
import AvatarCompanyFallback from "@/components/avatar-company-fallback";

type TeamLeadTagsCardProps = {
  tag: TagsInfo;
  isDetailedInfo?: boolean;
};

const TeamLeadTagsCard = ({
  tag,
  isDetailedInfo = false,
}: TeamLeadTagsCardProps) => {
  return (
    <Card
      className={`flex flex-col gap-4 break-all rounded-lg border border-solid border-[#E1E1E1]
     ${tag.docStatus === "inactive" ? "bg-[#EFEFEF]" : "bg-white"} p-4 hover:shadow-md`}
    >
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-3">
        <div className="flex cursor-pointer gap-2">
          <CardIcon>
            <CardIconImage
              className="w-[46px h-[47px] rounded"
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${tag.company.companyLogo.storageName}`}
            />
            <AvatarCompanyFallback />
          </CardIcon>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-0.5 md:flex-row md:gap-[5px]">
              <h4 className=" text-lg font-extrabold leading-[27px] text-[#171717]">
                {tag.tagCode}
              </h4>
              <div className="hidden h-6 w-0.5 bg-[#A9A9A9] md:flex" />
              <h4 className=" text-lg font-extrabold capitalize leading-[27px] text-[#171717]">
                {tag.jobTitle}
              </h4>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-normal capitalize leading-5 text-[#171717]">
                {tag.company.companyName}
              </p>
              <div className="h-1 w-1 rounded-full bg-[#A9A9A9]" />
              <p className="text-sm font-normal capitalize leading-5 text-[#171717]">
                {tag.location}
              </p>
              <div className="h-1 w-1 rounded-full bg-[#A9A9A9]" />
              <p className="text-sm font-normal capitalize leading-5 text-[#171717]">
                {tag.experienceLevel}
              </p>
            </div>
          </div>
        </div>
        {/* Team Lead */}
        <div className="flex gap-[7px]">
          <p className="text-sm font-normal text-[#5E5E5E]">
            Team Lead assigned :
          </p>
          <span className="flex gap-0.5 text-sm font-semibold text-[#171717]">
            {tag.teamleads[0].name}{" "}
            {tag.teamleads.length > 1 && (
              <p>+{tag.teamleads.length - 1} more</p>
            )}
          </span>
        </div>
      </div>
      <div className="flex cursor-pointer flex-col gap-2 text-sm leading-5 text-[#171717] md:flex-row md:items-center md:gap-4">
        <p className=" font-normal">
          Posted by :{" "}
          <span className="font-bold capitalize -tracking-[0.28px]">
            {tag.recruiter.fullName}
          </span>
        </p>
        <p className=" font-normal">
          Skills needed :{" "}
          <span className="font-bold -tracking-[0.28px] ">
            {/* Management, Financing, Communication */}
            {tag.skills.map((skill) => _.upperFirst(skill)).join(", ")}
          </span>
        </p>{" "}
      </div>
      {/* description */}
      <p
        className={`${
          !isDetailedInfo && "line-clamp-2"
        } cursor-pointer text-sm font-normal leading-5 text-[#171717]`}
      >
        {tag.other}{" "}
      </p>
      {/* candidate needed */}
      <div className="flex flex-col text-sm font-normal leading-5 text-[#5E5E5E] md:flex-row md:items-center md:justify-between">
        <p>
          Posted on{" "}
          {new Date(tag.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p>
          <span className="font-extrabold text-[#171717]">
            {tag.candidateCount}
          </span>{" "}
          candidate{tag.candidateCount !== 1 && "s"} needed
        </p>
        <p></p>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <p>
            <span className="font-extrabold text-[#171717]">
              {" "}
              {tag.candidateIds.length}
            </span>{" "}
            candidate{tag.candidateIds.length !== 1 && "s"} added
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TeamLeadTagsCard;

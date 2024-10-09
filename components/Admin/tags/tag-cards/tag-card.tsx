import { Card } from "@/components/ui/card";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import React, { useState } from "react";
import TeamLeadCard from "./team-lead-card";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { TagsInfo } from "@/features/tags/type/tags-info";
import _ from "lodash";
import { formatPostedAt } from "@/components/recruiter/Dashboard/tags-card/tags-card-dashboard";
import { useSendToRecruiter } from "@/features/tags/admin/api/send-to-recruiter";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface TagsCardProps {
  tag: TagsInfo;
}

const TagsCard = ({ tag }: TagsCardProps) => {
  const [openAssignMoreTeamLeads, setOpenAssignMoreTeamLeads] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const queryClient = useQueryClient();
  //  console.log("assign current state:", tag);
  const TagId = tag?._id;
  const router = useRouter();
  const pathName = usePathname();
  const toggleFullText = () => {
    setShowFullText((prev) => !prev);
  };

  // const handleRedirection = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  // ) => {
  //   event.stopPropagation();
  //   const clickedElement = event.target as HTMLElement;
  //   const isButton = clickedElement.closest("button") !== null;
  //   const isTeamLead = clickedElement.classList.contains("team-lead");
  //   if (!isButton && !isTeamLead && pathName !== `admin/tags/${TagId}`) {
  //     router.push(`${pathName}/${TagId}`);
  //   }
  // };

  const handleRedirect = () => {
    router.push(`${pathName}/${TagId}`);
  };

  // form success submit
  const formSubmissionhandleSuccess = (response: any) => {
    queryClient.invalidateQueries({ queryKey: ["tags-admin"] });
    queryClient.invalidateQueries({ queryKey: ["get-tag-by-id"] });
    toast.success(response?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const { mutate, isLoading, isError } = useSendToRecruiter(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );
  return (
    <>
      <Card
        onClick={handleRedirect}
        className={`flex flex-col gap-4 break-all rounded-lg border border-solid border-[#E1E1E1]
        ${tag.docStatus === "inactive" ? "bg-[#EFEFEF]" : "bg-white"} cursor-pointer p-4 hover:shadow-md`}
      >
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-3">
          <div className="flex cursor-pointer gap-2">
            <CardIcon>
              <CardIconImage
                className="w-[46px h-[47px] rounded"
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${tag?.company?.companyLogo?.storageName}`}
                alt="company Image"
              />
              <CardIconFallback>{tag?.company?.companyName}</CardIconFallback>
            </CardIcon>
            {/* title */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-0.5 md:flex-row md:gap-[5px]">
                <h4 className=" text-lg font-extrabold leading-[27px] text-[#171717]">
                  {tag?.tagCode}
                </h4>
                <div className="hidden h-6 w-[1px] bg-[#A9A9A9] md:flex" />
                <h4 className=" text-lg font-extrabold leading-[27px] text-[#171717]">
                  {_.upperFirst(tag?.jobTitle)}
                </h4>
              </div>
              {/* details */}
              <div className="flex items-center gap-1">
                <p className="text-sm font-normal leading-5 text-[#171717]">
                  {tag?.company?.companyName}
                </p>
                <div className="h-1 w-1 rounded-full bg-[#A9A9A9]" />
                <p className="text-sm font-normal leading-5 text-[#171717]">
                  {tag?.location}
                </p>
                <div className="h-1 w-1 rounded-full bg-[#A9A9A9]" />
                <p className="text-sm font-normal leading-5 text-[#171717]">
                  {tag?.experienceLevel === "fresher"
                    ? _.upperFirst(tag?.experienceLevel)
                    : `${tag?.experienceLevel} experience`}
                </p>
              </div>
            </div>
          </div>
          {/* Team Lead */}
          <div className="team-lead">
            {!pathName.includes("/manager/tags") && (
              <TeamLeadCard
                tagId={tag?._id}
                teamleads={tag?.teamleads}
                setOpen={setOpenAssignMoreTeamLeads}
                open={openAssignMoreTeamLeads}
                docStatus={tag?.docStatus}
              />
            )}
          </div>
        </div>
        {/* posted by/skills */}
        <div
          className="flex cursor-pointer flex-col gap-2 text-sm leading-5 text-[#171717] md:flex-row md:items-center md:gap-4"
          // onClick={(event) => {
          //   handleRedirection(event);
          // }}
        >
          <p className=" font-normal">
            Posted by :{" "}
            <span className="font-bold -tracking-[0.28px] ">
              {" "}
              {tag?.recruiter?.fullName}
            </span>
          </p>
          <p className=" font-normal">
            Skills needed :{" "}
            <span className="font-bold -tracking-[0.28px] ">
              {tag?.skills?.map((skill) => _.upperFirst(skill)).join(", ")}
            </span>
          </p>{" "}
        </div>
        {/* description */}
        <p className="text-sm font-normal leading-5 text-[#171717]">
          {tag?.other?.length > 200 ? (
            <span className="cursor-pointer" onClick={toggleFullText}>
              {showFullText ? tag?.other : `${tag?.other?.slice(0, 200)}... `}
              {tag?.other?.length > 200 && (
                <span className="cursor-pointer text-blue-500">
                  {showFullText ? " Read Less" : " Read More"}
                </span>
              )}
            </span>
          ) : (
            tag?.other
          )}
        </p>
        {/* candidate needed */}
        <div className="flex flex-col text-sm font-normal leading-5 text-[#5E5E5E] md:flex-row md:items-center md:justify-between">
          <p>Posted on {formatPostedAt(tag?.createdAt)}</p>
          <p>
            <span className="font-extrabold text-[#171717]">
              {tag?.candidateCount}
            </span>{" "}
            candidates needed
          </p>
          <p></p>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <p>
              <span className="font-extrabold text-[#171717]">
                {tag?.candidateIds?.length}
              </span>{" "}
              candidates added
            </p>
            {!pathName?.includes("/manager/tags") && (
              <>
                <div className="hidden h-9 w-[1px] max-w-[133px] bg-[#A9A9A9] md:flex" />
                {tag?.sendToRecruiter ? (
                  <div className="flex max-w-[145px] items-center rounded-[8px] bg-white px-1 py-2.5 text-sm font-bold text-[#5E5E5E]">
                    Sent to Recruiter
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M4.53345 8.49999L7.93345 11.3333L12.4668 5.66666"
                        stroke="#5E5E5E"
                      />
                    </svg>
                  </div>
                ) : isLoading && !isError ? (
                  <Button
                    variant={"success"}
                    className="max-w-[149px]"
                    disabled
                  >
                    <Loader2 className="h-4 w-4 animate-spin" /> sending...
                  </Button>
                ) : (
                  <Button
                    variant={"success"}
                    onClick={(e) => {
                      e.stopPropagation();
                      mutate(tag?._id);
                    }}
                    disabled={tag?.docStatus === "inactive"}
                    className="max-w-[149px]"
                  >
                    Send to Recruiter
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default TagsCard;

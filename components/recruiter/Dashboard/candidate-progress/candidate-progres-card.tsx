import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Card } from "@/components/ui/card";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface CandidateProgresCardProps {
  data: JobApplicationSchema;
}

const CandidateProgresCard = ({ data }: CandidateProgresCardProps) => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/candidates/${data.candidateId}`}>
      <Card
        className={`flex flex-col gap-4 border border-[#EFEFEF] p-4 lg:w-[249px] ${data.candidate.hired && "bg-[#E1E1E1]"}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <CardIcon className="h-[50px] w-[50px] rounded-full">
              <CardIconImage
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${data?.candidate?.profilePhoto?.storageName}`}
              />
              <AvatarProfileFallback />{" "}
            </CardIcon>
            <div className="flex flex-col gap-0.5 text-[#171717]">
              <h4 className="text-base font-bold ">
                {data?.candidate?.fullName}
              </h4>
              <p className="text-sm font-medium">
                {data?.candidate?.jobTitle ?? "Not specified"}
              </p>
            </div>
          </div>
          <div>
            <Card className="inline-block rounded-[12px] border border-solid border-[#00BA704D] bg-[#00ba7014] px-3 py-1">
              <p className="text-sm font-semibold text-[#00BA70]">
                {data?.jobId.employmentMode ?? "Not Specified"}
              </p>
            </Card>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CandidateProgresCard;

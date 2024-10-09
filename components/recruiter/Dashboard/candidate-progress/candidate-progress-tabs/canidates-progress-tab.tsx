import React from "react";
import { Card } from "@/components/ui/card";
import CandidateProgresCard from "../candidate-progres-card";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";

interface CandidatesProgressTabProps {
  data: JobApplicationSchema[];
  fetchNextList: () => void;
  typeName:
    | "Invited"
    | "Invite Accepted"
    | "Interview Scheduled"
    | "Shortlisted"
    | "Offered"
    | "Hired"
    | "Rejected";
  primaryColor: string;
  secondaryColor: string;
}

const CandidatesProgressTab = ({
  data,
  fetchNextList,
  typeName,
  primaryColor,
  secondaryColor,
}: CandidatesProgressTabProps) => {
  const { ref, inView } = useInView();
  if (inView) {
    fetchNextList();
  }
  return (
    <div className="flex gap-3">
      <Card className={`w-[273px] rounded-[8px] bg-[${secondaryColor}] pb-2`}>
        <div
          className={`flex h-12 justify-between rounded-t-[8px] bg-[${primaryColor}] p-3`}
        >
          <h5 className="text-base font-bold tracking-[-0.32px] text-white">
            {typeName}
          </h5>
          <div className="flex h-[24px] min-w-[24px] items-center justify-center rounded-[4px] bg-[#F7F7F7] px-1 py-[5px]">
            <p
              className={`text-sm font-bold tracking-[-0.28px] text-[${primaryColor}]`}
            >
              {data?.length ?? 0}
            </p>
          </div>
        </div>

        {data?.length === 0 || !data ? (
          <div className="flex h-[446px] items-center justify-center">
            <p className="text-center text-sm font-semibold text-[#171717]">
              No {typeName} Candidates
            </p>
          </div>
        ) : (
          <ScrollArea>
            <div className="flex h-[446px] flex-col gap-1 pl-3 pt-3">
              {data?.map((item, i) => (
                <div key={item._id} ref={data.length === i + 1 ? ref : null}>
                  <CandidateProgresCard data={item} />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </Card>
    </div>
  );
};

export default CandidatesProgressTab;

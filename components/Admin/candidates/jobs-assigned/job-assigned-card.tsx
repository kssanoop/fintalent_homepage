import React, { useState } from "react";
import TriggeredCardHeader from "./triggered-card-header";
import { Card } from "@/components/ui/card";
import VerticalProgressBar from "./progress-bar-dotted";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { startCase } from "lodash";

interface JobAssignedCardProps {
  data: JobApplicationSchema;
}

const JobAssignedCard = ({ data }: JobAssignedCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log("jobs assigned:", data);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card
      className={`relative rounded-[5px] border-solid border-[#EFEFEF] transition-all`}
    >
      <div className="cursor-pointer border-none" onClick={toggleAccordion}>
        <TriggeredCardHeader isOpen={isOpen} data={data} />
        {isOpen && (
          <div className="-mt-1 mb-4 ml-5 h-[1px] w-[calc(100%-60px)] bg-[#E1E1E1]" />
        )}
      </div>
      {isOpen && (
        <div
          className={`all relative transition ${
            isOpen ? "accordion-up" : "accordion-down"
          } `}
        >
          <div className="pb-5">
            <VerticalProgressBar
              currentStage={startCase(data?.status)}
              jobDetails={data}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default JobAssignedCard;

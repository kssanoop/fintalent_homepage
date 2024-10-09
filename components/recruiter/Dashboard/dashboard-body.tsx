import React from "react";
import RecruiterCard from "./recruiter-card/recruiter-card";
import OverviewCard from "./Overview-recruiter-dashboard/overview-card";
import QualificationCard from "./qualification/qualification-card";
// import SkillCard from "./skills-card/skill-card";
import TagsCardDashboard from "./tags-card/tags-card-dashboard";
import CandidateProgress from "./candidate-progress/candidate-progress";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import SkillCard from "./skills-card/skill-card";
import Link from "next/link";

const DashboardBody = () => {
  return (
    <DynamicHeightContainer>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          {/* overview */}
          <div
            className="flex w-full flex-col gap-[9px] px-2 pt-2 lg:flex-row
     lg:items-end lg:gap-4 lg:px-5 lg:pt-4"
          >
            <Link
              href="/recruiter/profile"
              className="rounded-[8px] transition-all hover:shadow"
            >
              <RecruiterCard />
            </Link>
            <div className="w-full">
              <OverviewCard />
            </div>
          </div>
          {/* qualification/skill/tags */}
          <div className="flex flex-col gap-[11px] px-2 lg:flex-row lg:px-5">
            <QualificationCard />
            <SkillCard />
            <TagsCardDashboard />
          </div>
        </div>
        {/* hiring progress */}
        <div className="overflow-x-auto pl-5">
          <CandidateProgress />
        </div>
      </div>
    </DynamicHeightContainer>
  );
};

export default DashboardBody;

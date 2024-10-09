import PrimaryLayout from "@/components/layout/primary-layout";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import InterviewHeader from "@/features/interview/candidate/components/InterviewHeader";
import InterviewRequest from "@/features/interview/candidate/components/InterviewRequest";
import UpcomingInterviews from "@/features/interview/candidate/components/UpcomingInterviews";
import React, { useState, type ReactElement } from "react";

const Interviews = () => {
  const [countofInterviewRequest, setCountofInterviewRequest] = useState("");
  return (
    <div className="container-width flex h-[100dvh] w-full grow flex-col bg-white md:bg-[#F7F7F7]">
      <div className="w-full pb-2">
        <InterviewHeader countofInterviewRequest={countofInterviewRequest} />
      </div>
      <DynamicHeightContainer>
        <div className="flex flex-col px-4">
          <InterviewRequest setInterviewCount={setCountofInterviewRequest} />
        </div>

        <div className="">
          <UpcomingInterviews />
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

Interviews.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Interviews;

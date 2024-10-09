import React, { ReactElement, useState } from "react";
import PrimaryLayout from "@/components/layout/primary-layout";
import JObsHeader from "@/features/jobs/candidate/Components/JObsHeader";
import JobsOffer from "@/features/jobs/candidate/Components/JobsOffer";
import JobTabs from "@/features/jobs/candidate/Components/JobTabs";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { ErrorBoundary } from "react-error-boundary";
const CandidateJobs = () => {
  const [offerNumber, setOfferNumber] = useState(0);

  // fn cached to avoid re renders
  const updateOfferNumber = React.useCallback((number: number) => {
    setOfferNumber(number);
  }, []);

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-white md:bg-[#F7F7F7]">
      <div className="w-full pb-1">
        <JObsHeader offerNumber={offerNumber} />
      </div>
      <DynamicHeightContainer>
        <div className={`flex  flex-col gap-1 pl-5 md:gap-4 md:pl-6`}>
          <ErrorBoundary
            fallback={
              <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
                Something went wrong! Unable to fetch data.
              </div>
            }
            onError={(error: any, errorInfo) => {
              console.log("Error caught!", error);
            }}
          >
            <JobsOffer updateOfferNumber={updateOfferNumber} />
          </ErrorBoundary>
        </div>
        <div className="px-5 md:px-0 md:pl-6 md:pr-[21px]">
          <JobTabs offerNumber={offerNumber} />
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

CandidateJobs.getLayout = function getLayout(Page: ReactElement) {
  return <PrimaryLayout>{Page}</PrimaryLayout>;
};

export default CandidateJobs;

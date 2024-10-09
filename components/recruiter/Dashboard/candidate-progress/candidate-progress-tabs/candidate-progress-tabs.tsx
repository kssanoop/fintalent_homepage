import React from "react";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import CandidatesProgressTab from "./canidates-progress-tab";

interface CandidateProgressTabsProps {
  joApplicationData: JobApplicationSchema[];
  fetchNextList: () => void;
}

const CandidateProgressTabs = ({
  joApplicationData,
  fetchNextList,
}: CandidateProgressTabsProps) => {
  // Filter data based on status
  const invitedCandidates = joApplicationData?.filter(
    (job) => job?.status === "invited",
  );
  const acceptedCandidates = joApplicationData?.filter(
    (job) => job?.status === "inviteAccepted",
  );
  const interviewScheduledCandidates = joApplicationData?.filter(
    (job) => job?.status === "interViewScheduled",
  );
  const shortlistedCandidates = joApplicationData?.filter(
    (job) => job?.status === "shortlisted",
  );
  const offeredCandidates = joApplicationData?.filter(
    (job) => job?.status === "offered",
  );
  const hiredCandidates = joApplicationData?.filter(
    (job) => job?.status === "hired",
  );
  const rejectedCandidates = joApplicationData?.filter(
    (job) => job?.status === "rejected",
  );
  return (
    // <DynamicWidthContainer>
    <div className="flex w-full gap-3">
      <CandidatesProgressTab
        data={invitedCandidates}
        fetchNextList={fetchNextList}
        typeName="Invited"
        primaryColor="#3790E3"
        secondaryColor="#3790e31a"
      />
      <CandidatesProgressTab
        data={acceptedCandidates}
        fetchNextList={fetchNextList}
        typeName="Invite Accepted"
        primaryColor="#E37F37"
        secondaryColor="#e27f371a"
      />
      <CandidatesProgressTab
        data={interviewScheduledCandidates}
        fetchNextList={fetchNextList}
        typeName="Interview Scheduled"
        primaryColor="#DEAC2B"
        secondaryColor="#deac2b1a"
      />
      <CandidatesProgressTab
        data={shortlistedCandidates}
        fetchNextList={fetchNextList}
        typeName="Shortlisted"
        primaryColor="#3A37E3"
        secondaryColor="#3a37e21a"
      />
      <CandidatesProgressTab
        data={offeredCandidates}
        fetchNextList={fetchNextList}
        typeName="Offered"
        primaryColor="#B253DE"
        secondaryColor="#b253de1a"
      />
      <CandidatesProgressTab
        data={hiredCandidates}
        fetchNextList={fetchNextList}
        typeName="Hired"
        primaryColor="#00BA70"
        secondaryColor="#00ba704d"
      />
      <CandidatesProgressTab
        data={rejectedCandidates}
        fetchNextList={fetchNextList}
        typeName="Rejected"
        primaryColor="#E72F2F"
        secondaryColor="#ffcccc"
      />
    </div>
    //  </DynamicWidthContainer>
  );
};

export default CandidateProgressTabs;

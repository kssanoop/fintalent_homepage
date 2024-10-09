import HeaderBarBack from "@/components/Admin/common/HeaderBarBack";
import ProfileRight from "@/components/candidate/profile/body/profile-right";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import { useRouter } from "next/router";
import useGetCandidatesUnderTeamLeadForAdmin from "@/features/admin/team-lead/api/get-candidates-under-team-lead-for-admin";
import CandidateProfileLeft from "@/components/manager/candidate-profile/candidate-profile-left";

const CandidateIdRecruiter = () => {
  const router = useRouter();
  const teamLeadId = router.query.teamLeadId as string;
  const candidateId = router.query.candidateId as string;
  const { data, isLoading, isError } = useGetCandidatesUnderTeamLeadForAdmin({
    teamLeadId,
  });
  const candidate = data?.data?.find(
    (teamLead) => teamLead.candidateId === candidateId,
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;
  if (!candidate) return <div>Candidate not found.</div>;

  return (
    <>
      <div className="flex flex-col">
        {/* header */}
        <HeaderBarBack heading="Back" />
        {/* content */}
      </div>
      <div className="mt-[27px] flex grow flex-col px-5 md:flex-row md:gap-4 md:overflow-auto md:px-0">
        <div className="h-full md:w-[24%] md:min-w-[340px] md:pl-5">
          <CandidateProfileLeft data={candidate} />
        </div>
        <DynamicHeightContainer>
          <div className="scroll-container hide-scrollbar h-[calc(100%-8px)] md:overflow-auto md:pr-10">
            <ProfileRight
              isLoading={isLoading}
              data={candidate}
              Interface={ROLES.MANAGER}
              refetch={() => function refetch() {}}
            />
          </div>
        </DynamicHeightContainer>
      </div>
    </>
  );
};

CandidateIdRecruiter.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <Layout>
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
          <div className="flex h-screen w-full flex-col overflow-auto">
            {page}
          </div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};

export default CandidateIdRecruiter;

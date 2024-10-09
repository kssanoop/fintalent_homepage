import HeaderBarBack from "@/components/Admin/common/HeaderBarBack";
import ProfileLeft from "@/components/candidate/profile/body/profile-left";
import ProfileRight from "@/components/candidate/profile/body/profile-right";
import { personalDetails } from "@/features/ProfileEdit/UserDetails/Schema/profile-schema";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import { useGetCandidateByIdandRole } from "@/features/ProfileEdit/api/get-candidate-by-Id";
import { useRouter } from "next/router";

const CandidateId = () => {
  const router = useRouter();
  const candidateId = router.query?.candidateId as string;

  const { data, isLoading } = useGetCandidateByIdandRole({
    roleType: "admin",
    candidateId,
  });
  const PersonalDetails: personalDetails = {
    profilePhoto: data?.profilePhoto,
    summary: data?.summary,
    fullName: data?.fullName,
    phoneNo: data?.phoneNo,
    email: data?.email,
    linkedInProfile: data?.linkedInProfile,
    currentOrganization: data?.currentOrganization,
    jobTitle: data?.jobTitle,
    profileVerified: data?.profileVerified,
    totalExperience: data?.totalExperience,
    docStatus: data?.docStatus,
    teamLead: data?.teamLead,
  };
  console.log("Candidate Data:", data);
  return (
    <>
      <div className="flex flex-col">
        {/* header */}
        <HeaderBarBack heading="Back" />
        {/* content */}
      </div>
      <div className="mt-[27px] flex h-full flex-col px-5 md:flex-row md:gap-4 md:overflow-auto md:px-0">
        <div className="h-full md:w-[24%] md:min-w-[340px] md:pl-5">
          <ProfileLeft
            data={PersonalDetails}
            Interface={ROLES.ADMIN}
            showToggleSwitch={true}
            isLoading={isLoading}
          />
        </div>
        <DynamicHeightContainer>
          <div className="scroll-container hide-scrollbar md:overflow-auto md:pr-10">
            {data && (
              <ProfileRight
                data={data}
                Interface={ROLES.ADMIN}
                refetch={() => function refetch() {}}
                isLoading={isLoading}
              />
            )}
          </div>
        </DynamicHeightContainer>
      </div>
    </>
  );
};

CandidateId.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
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
          <div className="flex h-full w-full flex-col overflow-auto">
            {page}
          </div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};

export default CandidateId;

import HeaderBarBack from "@/components/Admin/common/HeaderBarBack";
// import { personalDetails } from "@/features/ProfileEdit/UserDetails/Schema/profile-schema";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import CandidateProfileBody from "@/components/Admin/candidates/profile-tab/candidate-profile-body";
import { useRouter } from "next/router";
import { useGetCandidateByIdandRole } from "@/features/ProfileEdit/api/get-candidate-by-Id";

// export const demoPersonalDetails: personalDetails = {
//   profilePhoto: {
//     originalName: "john-doe.jpg",
//     storageName: "/temp/person8.jpeg",
//   },
//   summary: "Experienced software engineer with a passion for coding.",
//   fullName: "John Doe",
//   phoneNo: "123-456-7890",
//   email: "john.doe@example.com",
//   linkedInProfile: "https://www.linkedin.com/in/johndoe/",
//   currentOrganization: "Tech Co.",
//   jobTitle: "Software Engineer",
//   profileVerified: true,
//   totalExperience: { year: "5", month: "9" },
// };

const CandidateId = () => {
  const router = useRouter();
  const candidateId = router.query?.candidateId as string;
  const { data, isLoading } = useGetCandidateByIdandRole({
    roleType: "admin",
    candidateId,
  });
  console.log("candidate page data:", data);
  return (
    <>
      <div className="flex flex-col">
        {/* header */}
        <HeaderBarBack heading="Back" />
        {/* content */}
      </div>
      <CandidateProfileBody data={data} isLoading={isLoading} />
    </>
  );
};

CandidateId.getLayout = function getLayout(page: ReactElement) {
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
          <div className="flex h-full w-full flex-col overflow-auto">
            {page}
          </div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};

export default CandidateId;

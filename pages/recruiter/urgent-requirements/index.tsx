import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import HeadBar from "@/components/layout/head-bar";
import { ErrorBoundary } from "react-error-boundary";
import UrgentRequirementBody from "@/components/recruiter/urgent-requirements/urgent-requirement-body";
const RecruiterTags = () => {
  return (
    <div>
      <UrgentRequirementBody />
    </div>
  );
};

RecruiterTags.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar heading="Urgent requirement" />
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
            <div>{page}</div>
          </ErrorBoundary>
        </div>
      </Layout>
    </Authorization>
  );
};

export default RecruiterTags;

import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import Layout from "@/components/layout/primary-layout";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HeadBar from "@/components/layout/head-bar";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import RecruitingCompaniesTableContainer from "@/components/manager/recruiting-companies/recruiting-companies-table-container";
const RecruitingCompanies = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col gap-3">
        <HeadBar heading="Recruiting Companies" />
        <div className="flex-1 pl-5">
          <div className="h-full w-full overflow-auto pt-1">
            <DynamicHeightContainer>
              <RecruitingCompaniesTableContainer />
            </DynamicHeightContainer>
          </div>
        </div>
      </div>
    </>
  );
};

RecruitingCompanies.getLayout = function getLayout(page: ReactElement) {
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
          <div className="flex h-full w-full overflow-auto">{page}</div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};
export default RecruitingCompanies;

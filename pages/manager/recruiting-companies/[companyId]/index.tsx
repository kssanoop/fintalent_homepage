import HeaderBarBack from "@/components/Admin/common/HeaderBarBack";
import AllRecruitersDataTable from "@/components/Admin/recruitment-partners/components/all-recruiters-data-table";
import Layout from "@/components/layout/primary-layout";
import CompanyCard from "@/components/manager/recruiting-companies/company-card";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useGetCompaniesAllActiveRecruiter } from "@/features/recuitment-partners/admin/api/get-active-recruiter-by-companyId";
import { useGetCompanyById } from "@/features/recuitment-partners/admin/api/get-company-by-id";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CompanyID = () => {
  const router = useRouter();
  const companyId = router.query.companyId as string;

  // const extractedCompanyId =
  //   companyId && typeof companyId === "object"
  //     ? Array.isArray(companyId)
  //       ? companyId[0]
  //       : companyId
  //     : companyId;
  console.log("company Id:", companyId);
  const {
    data: companyListData,
    isLoading,
    isError,
    error,
  } = useGetCompanyById(companyId);
  const {
    data: companyReruiterData,
    isLoading: isCompanyReruiterData,
    isError: isCompanyReruiterDataError,
    error: companyReruiterDataError,
  } = useGetCompaniesAllActiveRecruiter({ companyId });

  const selectedCompany = companyListData;

  console.log("Selected Company:", selectedCompany);
  if (isError) {
    return <div>{error as string}</div>;
  }

  return (
    <div className="flex h-[100dvh] w-full flex-col gap-[14px] bg-white">
      <HeaderBarBack heading="Back" />
      <DynamicHeightContainer>
        <div className="flex flex-col gap-4 px-5">
          <CompanyCard
            isLoading={isLoading}
            companyData={selectedCompany}
            key={crypto.randomUUID()}
          />

          <div className="pt-1">
            <AllRecruitersDataTable
              companyReruiterData={companyReruiterData}
              isLoading={isCompanyReruiterData}
              isError={isCompanyReruiterDataError}
              error={companyReruiterDataError}
            />
          </div>
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

CompanyID.getLayout = function getLayout(page: ReactElement) {
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

export default CompanyID;

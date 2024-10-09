import BillingHistoryTable from "@/components/Admin/billing/billing-history-table";
import HeaderBarBack from "@/components/Admin/common/HeaderBarBack";
import CompanyCard from "@/components/Admin/recruitment-partners/components/company-card";
// import CompanyRecruiterTabs from "@/components/Admin/recruitment-partners/components/company-recruiter-tabs";
import Layout from "@/components/layout/primary-layout";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useGetCompanyById } from "@/features/recuitment-partners/admin/api/get-company-by-id";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CompanyID = () => {
  const router = useRouter();
  const { companyId } = router.query;

  const extractedCompanyId =
    companyId && typeof companyId === "object"
      ? Array.isArray(companyId)
        ? companyId[0]
        : companyId
      : companyId;
  console.log("company Id:", extractedCompanyId);
  const {
    data: companyListData,
    isLoading,
    isError,
    error,
  } = useGetCompanyById(extractedCompanyId);

  const selectedCompany = companyListData;

  // console.log("Selected Company:", selectedCompany);
  if (isError) {
    return <div>{error as string}</div>;
  }

  return (
    <div className="flex h-[100dvh] w-full flex-col gap-[14px] bg-white">
      <HeaderBarBack heading="Back" className="border-b border-border" />
      <DynamicHeightContainer>
        <div className="flex flex-col gap-9 px-5">
          <CompanyCard isLoading={isLoading} companyData={selectedCompany} />
          <BillingHistoryTable isEditable={true} />{" "}
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

CompanyID.getLayout = function getLayout(page: ReactElement) {
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
          <div className="flex h-full w-full overflow-auto">{page}</div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};

export default CompanyID;

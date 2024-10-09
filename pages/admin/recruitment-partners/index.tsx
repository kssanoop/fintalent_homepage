// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";
import AllCompanyBody from "@/components/Admin/recruitment-partners/components/all-company-body";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import Layout from "@/components/layout/primary-layout";
import React, { ReactElement, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AddDilaog from "@/components/Admin/recruitment-partners/components/add-dilaog";
import HeaderBar from "@/components/Admin/common/HeaderBar";
const RecruitingPartners = () => {
  // const router = useRouter();
  // const companyId = 1234567;
  const [openDialogaddCompany, setOpenDialogAddCompany] = useState(false);
  return (
    <>
      <div className="flex h-full w-full flex-col gap-3">
        {/* header */}
        <HeaderBar
          showButton={true}
          showFilter={true}
          title={"Recruiting Companies"}
          setOpen={setOpenDialogAddCompany}
          buttonText={"Add company"}
        />
        {/* body */}
        <div className="flex-1 pl-5">
          <AllCompanyBody />
        </div>
      </div>
      <AddDilaog
        open={openDialogaddCompany}
        setOpen={setOpenDialogAddCompany}
        page={"companyPage"}
      />
    </>
  );
};

RecruitingPartners.getLayout = function getLayout(page: ReactElement) {
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
export default RecruitingPartners;

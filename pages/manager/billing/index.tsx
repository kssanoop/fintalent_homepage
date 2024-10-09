import BillingBody from "@/components/Admin/billing/billing-body";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import HeadBar from "@/components/layout/head-bar";
const Billing = () => {
  return (
    <>
      <BillingBody />
    </>
  );
};

Billing.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col overflow-y-auto">
          <HeadBar heading="Billing" />
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
            <div className="scroll-container grow overflow-y-auto px-2 py-3 md:p-5 ">
              {page}
            </div>
          </ErrorBoundary>
        </div>
      </Layout>
    </Authorization>
  );
};

export default Billing;

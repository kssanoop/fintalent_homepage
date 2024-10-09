import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import HeadBar from "@/components/layout/head-bar";
import BillingBodyRecruiter from "@/components/recruiter/billings/billing-body";
const RecruiterBilling = () => {
  return (
    <div>
      <BillingBodyRecruiter />
    </div>
  );
};

RecruiterBilling.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar heading="Billing" />

          <div className="scroll-container grow overflow-y-auto px-5 py-4 ">
            {page}
          </div>
        </div>
      </Layout>
    </Authorization>
  );
};

export default RecruiterBilling;

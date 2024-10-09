import { ReactElement } from "react";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import HeadBar from "@/components/layout/head-bar";
import PrimaryLayout from "@/components/layout/primary-layout";
import DashboardBody from "@/components/recruiter/Dashboard/dashboard-body";

const Recruiter = () => {
  return (
    <>
      <HeadBar heading="Dashboard" />
      <div className="bg-[#EFEFEF]">
        <DashboardBody />
      </div>
    </>
  );
};

Recruiter.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <PrimaryLayout>
        <div className="flex h-screen grow flex-col overflow-y-auto bg-white">
          {page}
        </div>
      </PrimaryLayout>
    </Authorization>
  );
};

export default Recruiter;

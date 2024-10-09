import { ReactElement } from "react";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import PrimaryLayout from "@/components/layout/primary-layout";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import DashboardBody from "@/components/Dashboard/Dashboard-body";
import NotificationButton from "@/components/notification/notification-button";

const Admin = () => {
  return (
    <>
      <div className="pb-4 pl-5 pr-5 pt-5 lg:pb-4 lg:pl-[29px] lg:pr-[23px] lg:pt-[18px]">
        <div className="hidden items-center justify-between lg:flex">
          <h1 className=" text-xl font-bold text-[#171717] ">Dashboard</h1>
          <NotificationButton />
        </div>

        <div className="flex items-center gap-2 text-xl font-bold text-[#171717] lg:hidden">
          <MobileSidebar />
          <h1> Dashboard</h1>
        </div>
      </div>
      <div className="flex grow flex-col overflow-x-auto">
        <div className="flex grow  flex-col gap-3">
          <DashboardBody />{" "}
        </div>
      </div>
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
    >
      <PrimaryLayout>
        <div className="flex h-screen grow flex-col overflow-y-auto bg-[#012a5914]">
          {page}
        </div>
      </PrimaryLayout>
    </Authorization>
  );
};

export default Admin;

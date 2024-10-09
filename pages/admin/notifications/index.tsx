import { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { ChevronLeft } from "lucide-react";
import Router from "next/router";
import NotificationContainer from "@/components/notification-container";

const Notifications = () => {
  return <NotificationContainer />;
};

Notifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <div className="flex min-h-[62px] w-full items-center bg-white px-5">
            <div
              className="flex cursor-pointer items-center gap-1"
              onClick={() => {
                Router.back();
              }}
            >
              <ChevronLeft color="#5E5E5E" size={21} />
              <div className="text-xl font-bold text-brand-black">
                Notifications
              </div>
            </div>
          </div>
          {page}
        </div>
      </Layout>
    </Authorization>
  );
};

export default Notifications;

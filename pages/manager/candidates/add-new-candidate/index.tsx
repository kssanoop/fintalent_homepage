import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import ProfileForm from "@/features/auth/candidate/login/components/profile-setup";
import { Card } from "@/components/ui/card";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import HeadBar from "@/components/layout/head-bar";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import NotificationButton from "@/components/notification/notification-button";
const AddNewCandidate = () => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col">
      <HeadBar
        heading="Add new Candidate"
        customRightSideComponent={
          <div className="flex gap-5">
            <NotificationButton />

            <X
              size={24}
              color="#000000"
              className="mr-5 cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
          </div>
        }
      />
      <div className="mt-4 flex px-5">
        <Card className="border border-[#A9A9A9]">
          <DynamicHeightContainer>
            <div className="mb-8 flex w-full items-center justify-center md:w-[800px]">
              <ProfileForm isThirdPartyUser={true} />
            </div>
          </DynamicHeightContainer>
        </Card>
      </div>
    </div>
  );
};

AddNewCandidate.getLayout = function getLayout(page: ReactElement) {
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

export default AddNewCandidate;

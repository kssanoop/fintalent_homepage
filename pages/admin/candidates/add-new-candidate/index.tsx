import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import HeaderBar from "@/components/Admin/common/HeaderBar";
import ProfileForm from "@/features/auth/candidate/login/components/profile-setup";
import { Card } from "@/components/ui/card";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
const AddNewCandidate = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [handleCloseButton, setHandleCloseButton] = useState(true);
  return (
    <div className="flex h-full w-full flex-col">
      <HeaderBar
        title={"Add new Candidate"}
        showFilter={false}
        buttonText={"Add new Candidate "}
        setOpen={setHandleCloseButton}
        showButton={false}
      />
      <div className="mt-4 flex px-5">
        <Card className="border border-[#A9A9A9]">
          <DynamicHeightContainer>
            <div className="mb-8 flex w-full items-center justify-center md:w-[800px]">
              <ProfileForm
                isThirdPartyUser={true}
                setHandleCloseButton={setHandleCloseButton}
                handleCloseButton={handleCloseButton}
              />
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

export default AddNewCandidate;

import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import HeadBar from "@/components/layout/head-bar";
import NotificationButton from "@/components/notification/notification-button";

import { useGetRecruiterProfile } from "@/features/profile/recruiter/api/get-profile-recruiter";
import RecruiterProfileLeft from "@/components/recruiter/profile/recruiter-profile-left";
import RecruiterProfileRight from "@/components/recruiter/profile/recruiter-profile-right";

const Profile = () => {
  const { data: recruiter, isLoading, isError } = useGetRecruiterProfile();

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <h1>Something went wrong.</h1>;
  }

  return (
    <>
      <RecruiterProfileLeft recruiter={recruiter} />
      <div className="scroll-container hide-scrollbar md:w-[76%] md:overflow-auto">
        <RecruiterProfileRight recruiter={recruiter} />
      </div>
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-full w-full flex-col">
          <HeadBar
            heading="Your profile"
            customRightSideComponent={
              <div className="flex items-center gap-3">
                <NotificationButton />
              </div>
            }
          />
          <div className="flex grow flex-col gap-5 overflow-y-auto px-2 py-3 md:flex-row md:px-5 md:py-[27px]">
            {page}
          </div>
        </div>
      </Layout>
    </Authorization>
  );
};
export default Profile;

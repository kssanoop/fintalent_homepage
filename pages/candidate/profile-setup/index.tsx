import LoginLayout from "@/components/layout/login-layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import ProfileForm from "@/features/auth/candidate/login/components/profile-setup";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
const ProfileSetup: NextPageWithLayout = () => {
  return <ProfileForm isThirdPartyUser={false} />;
};

ProfileSetup.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.CANDIDATE} can view this.</div>}
      allowedRoles={[ROLES.CANDIDATE]}
      routeType="create"
    >
      <LoginLayout>{page}</LoginLayout>
    </Authorization>
  );
};

export default ProfileSetup;

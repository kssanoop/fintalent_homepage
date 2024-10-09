import LoginLayout from "@/components/layout/login-layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import SetNewPasswordForm from "@/features/auth/common/forgot-password/new-password";

const ProfileSetup: NextPageWithLayout = () => {
  return <SetNewPasswordForm role="recruiter" />;
};

ProfileSetup.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default ProfileSetup;

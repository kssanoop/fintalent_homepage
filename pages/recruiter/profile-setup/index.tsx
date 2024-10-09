import LoginLayout from "@/components/layout/login-layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import ProfileForm from "@/features/profile-setup/recruiter/components/profile-setup";

const ProfileSetup: NextPageWithLayout = () => {
  return <ProfileForm />;
};

ProfileSetup.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default ProfileSetup;

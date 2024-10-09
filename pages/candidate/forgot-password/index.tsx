import ForgotPasswordForm from "@/features/auth/common/forgot-password/forgot-password";
import { ReactElement } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { NextPageWithLayout } from "@/pages/_app";

const ForgotPassword: NextPageWithLayout = () => {
  return <ForgotPasswordForm role="candidate" />;
};

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default ForgotPassword;

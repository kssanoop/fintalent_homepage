import { type ReactElement } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { type NextPageWithLayout } from "@/pages/_app";
import ForgotPasswordForm from "@/features/auth/common/forgot-password/forgot-password";

const ForgotPassword: NextPageWithLayout = () => {
  return <ForgotPasswordForm role={"manager"} />;
};

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default ForgotPassword;

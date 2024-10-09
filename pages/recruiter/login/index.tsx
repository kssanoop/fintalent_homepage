import LoginForm from "@/features/auth/common/login-form";

import { type ReactElement } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { type NextPageWithLayout } from "@/pages/_app";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
const RecruiterLogin: NextPageWithLayout = () => {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
      routeType="auth"
    >
      <LoginForm role={"recruiter"} />
    </Authorization>
  );
};

RecruiterLogin.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default RecruiterLogin;

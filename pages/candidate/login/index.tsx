import LoginForm from "@/features/auth/common/login-form";

import { type ReactElement } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { type NextPageWithLayout } from "@/pages/_app";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
const CandidateLogin: NextPageWithLayout = () => {
  return <LoginForm role={"candidate"} />;
};

CandidateLogin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.CANDIDATE} can view this.</div>}
      allowedRoles={[ROLES.CANDIDATE]}
      routeType="auth"
    >
      <LoginLayout>{page}</LoginLayout>
    </Authorization>
  );
};

export default CandidateLogin;

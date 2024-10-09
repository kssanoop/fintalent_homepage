import LoginForm from "@/features/auth/common/login-form";

import { type ReactElement } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { type NextPageWithLayout } from "@/pages/_app";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
const TeamLeadLogin: NextPageWithLayout = () => {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.TEAM_LEAD} can view this.</div>}
      allowedRoles={[ROLES.TEAM_LEAD]}
      routeType="auth"
    >
      <LoginForm role="teamlead" />
    </Authorization>
  );
};

TeamLeadLogin.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default TeamLeadLogin;

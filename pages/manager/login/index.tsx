import LoginForm from "@/features/auth/common/login-form";

import { type ReactElement } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { type NextPageWithLayout } from "@/pages/_app";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
const AdminLogin: NextPageWithLayout = () => {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
      routeType="auth"
    >
      <LoginForm role={"manager"} />
    </Authorization>
  );
};

AdminLogin.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default AdminLogin;

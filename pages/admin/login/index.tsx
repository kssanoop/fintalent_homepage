import LoginForm from "@/features/auth/common/login-form";

import { type ReactElement } from "react";
import LoginLayout from "@/components/layout/login-layout";
import { type NextPageWithLayout } from "@/pages/_app";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
const AdminLogin: NextPageWithLayout = () => {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
      routeType="auth"
    >
      <LoginForm role={"admin"} />
    </Authorization>
  );
};

AdminLogin.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default AdminLogin;

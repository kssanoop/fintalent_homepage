import React from "react";
import { RoleTypes, RouteType } from "@/types/authorization";
import useCheckPageAccess from "@/utils/hooks/useCheckPageAccess";
import useHandleProtectedPage from "@/utils/hooks/useHandleProtectedPage";

export type AllowedRoles = RoleTypes[] | RoleTypes | "all";

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
  routeType?: RouteType;
  allowedRoles: AllowedRoles;
};

export const Authorization = ({
  allowedRoles,
  forbiddenFallback = null,
  children,
  routeType = "private",
}: AuthorizationProps) => {
  const { canAccess } = useCheckPageAccess({ allowedRoles, routeType });

  const { isForcedAccess } = useHandleProtectedPage({
    routeType,
    allowedRoles,
  });

  //  Note:  Checking undefined to avoid flickering due to hydration error
  if (canAccess === undefined) {
    return null;
  }

  if (!canAccess && !isForcedAccess) {
    return <>{forbiddenFallback}</>;
  }

  return <>{children}</>;
};

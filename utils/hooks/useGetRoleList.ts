import { AllowedRoles } from "@/lib/authorization";
import { ROLES_LIST, RoleTypes } from "@/types/authorization";
import { useMemo } from "react";

const useGetRoleList = (allowedRoles: AllowedRoles) => {
  const roleList: RoleTypes[] = useMemo(() => [], []);

  if (allowedRoles === "all") {
    roleList.push(...ROLES_LIST);
  } else if (Array.isArray(allowedRoles)) {
    roleList.push(...allowedRoles);
  } else {
    roleList.push(allowedRoles);
  }

  return { roleList };
};

export default useGetRoleList;

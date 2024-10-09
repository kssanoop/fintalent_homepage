import { RouteType } from "@/types/authorization";
import { useEffect, useState } from "react";
import { useAuthorization } from "./useAuthorization";
import { AllowedRoles } from "@/lib/authorization";
import useGetRoleList from "./useGetRoleList";

type UseCheckPageAccess = {
  allowedRoles: AllowedRoles;
  routeType: RouteType;
};

const useCheckPageAccess = ({
  allowedRoles,
  routeType,
}: UseCheckPageAccess) => {
  const [canAccess, setCanAccess] = useState<boolean | undefined>();

  const { roleList } = useGetRoleList(allowedRoles);

  const { checkToken, role } = useAuthorization();

  useEffect(() => {
    if (roleList) {
      const isToken = checkToken();
      if (!isToken) {
        if (routeType === "auth" || routeType === "public") {
          setCanAccess(true);
        } else {
          setCanAccess(false);
        }
      } else if (role) {
        setCanAccess(roleList.includes(role));
      }
    }
  }, [roleList, checkToken, role, routeType]);
  return { canAccess };
};

export default useCheckPageAccess;

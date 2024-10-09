import { useEffect, useState } from "react";
import Router from "next/router";
import { useGetInfoFromCookie } from "./useGetInfoFromCookie";
import useGetRoleList from "./useGetRoleList";
import { RouteType } from "@/types/authorization";
import { AllowedRoles } from "@/lib/authorization";

type UseHandleProtectedPage = {
  routeType: RouteType;
  allowedRoles: AllowedRoles;
};

const useHandleProtectedPage = ({
  routeType,
  allowedRoles,
}: UseHandleProtectedPage) => {
  const [isForcedAccess, setIsForcedAccess] = useState(false); // for handling the case of auth

  const { role, userDetails } = useGetInfoFromCookie();
  const { roleList } = useGetRoleList(allowedRoles);

  useEffect(() => {
    switch (routeType) {
      case "public":
        break;
      case "auth":
        if (role && userDetails && roleList.includes(role)) {
          if (userDetails.accountVerifiedStatus === "verified") {
            Router.replace(`/${role}`);
          } else if (userDetails.accountVerifiedStatus === "pendingProfile") {
            Router.replace(`/${role}/profile-setup`);
          } else if (
            userDetails.accountVerifiedStatus === "pendingVerification"
          ) {
            Router.replace(`/pending-verification`);
          }
        } else {
          // do nothing
          setIsForcedAccess(true);
        }
        break;
      case "create":
        if (role && userDetails) {
          if (userDetails.accountVerifiedStatus === "verified") {
            Router.replace(`/${role}`);
          }
        } else if (
          userDetails?.accountVerifiedStatus === "pendingVerification"
        ) {
          Router.replace(`/pending-verification`);
        } else {
          // do nothing
        }
        break;
      case "private":
        if (role) {
          if (userDetails.accountVerifiedStatus === "pendingProfile") {
            Router.replace(`/${role}/profile-setup`);
          } else if (
            userDetails.accountVerifiedStatus === "pendingVerification"
          ) {
            Router.replace(`/pending-verification`);
          }
        } else {
          // do nothing
        }
        break;
      case "pending":
        if (!role) {
          Router.replace("/");
        }
        break;

      default:
        break;
    }
  }, [role, roleList, routeType, userDetails]);

  return { isForcedAccess };
};

export default useHandleProtectedPage;

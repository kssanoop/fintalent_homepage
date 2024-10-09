import { type NextRouter } from "next/router";
import { RoleTypes } from "@/types/authorization";

type handleRedirectionProps =
  | {
      role: "candidate";
      profileVerified: boolean;
      accountVerifiedStatus: string;
      docStatus: string;
    }
  | {
      role: "recruiter";
      accountVerifiedStatus: string;
      docStatus: string;
    };

export const handleRedirection = async (
  data: handleRedirectionProps,
  router: NextRouter,
) => {
  const route = routeMapper(data.accountVerifiedStatus, data.role);
  await router.push(route);
};

function routeMapper(accountVerifiedStatus: string, role: RoleTypes) {
  switch (accountVerifiedStatus) {
    case "pendingProfile":
      return `/${role}/profile-setup`;
    case "pendingVerification":
      return `/pending-verification`;
    case "verified":
      return `/${role}`;
    default:
      return `/`;
  }
}

export default handleRedirection;

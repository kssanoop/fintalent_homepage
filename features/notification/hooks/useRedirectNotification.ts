import { NotificatioRedirectType } from "../type/notification-redirect-type";
import { useRouter } from "next/router";
import { useAuthorization } from "@/utils/hooks/useAuthorization";

const useRedirectNotication = () => {
  const { push } = useRouter();
  const { role } = useAuthorization();
  const basePath = role === "teamlead" ? "team-leads" : role;

  const redirect = ({
    redirectType,
  }: {
    redirectType: NotificatioRedirectType;
  }) => {
    switch (redirectType) {
      case "candidate":
        push(`/${basePath}/candidates`);
        break;

      case "chat":
        push(`/${basePath}/chat`);
        break;

      case "company":
        if (role === "admin") push(`/${basePath}/recruitment-partners`);
        if (role === "manager") push(`/${basePath}/recruiting-companies`);
        break;

      case "interview":
        push(`/${basePath}/interviews`);
        break;

      case "job":
        push(`/${basePath}/jobs`);
        break;

      case "profile":
        if (role === "recruiter" || role === "candidate")
          push(`/${basePath}/profile`);
        break;

      case "recruiter":
        if (role === "admin") push(`/${basePath}/recruitment-partners`);
        if (role === "manager") push(`/${basePath}/recruiting-companies`);
        break;

      case "tag":
        if (role === "recruiter") push(`/${basePath}/urgent-requirements`);
        push(`/${basePath}/tags`);
        break;

      case "teamlead":
        push(`/${basePath}/team-leads`);
        break;

      default:
        break;
    }
  };

  return { redirect };
};

export default useRedirectNotication;

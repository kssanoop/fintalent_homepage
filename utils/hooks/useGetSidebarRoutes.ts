import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";
import {
  Home,
  Tag,
  Briefcase,
  Users,
  MessageSquare,
  Calendar,
  HeartHandshakeIcon,
  Joystick,
} from "lucide-react";
import { ThreePeopleIcon } from "@/components/icons/sidebar-icons";
import BillingIcon from "@/components/billing-icon";
import useGetNotificationsCount from "@/features/notification/api/get-notifications-count";

const useGetSidebarRoutes = () => {
  const { role } = useGetInfoFromCookie();

  const { data } = useGetNotificationsCount();

  const candidateRoutes = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/candidate",
      type: "homePage",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/candidate/jobs",
    },
    {
      icon: MessageSquare,
      label: "Chat",
      href: "/candidate/chat",
    },
    {
      icon: Calendar,
      label: "Interviews",
      href: "/candidate/interviews",
    },
  ];

  const recruiterRoutes = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/recruiter",
      type: "homePage",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/recruiter/jobs",
    },
    {
      icon: Users,
      label: "Candidates",
      href: "/recruiter/candidates",
    },
    {
      icon: Tag,
      label: "Urgent requirement",
      href: "/recruiter/urgent-requirements",
    },
    {
      icon: MessageSquare,
      label: "Chat",
      href: "/recruiter/chat",
    },
    {
      icon: Calendar,
      label: "Interviews",
      href: "/recruiter/interviews",
    },
    {
      icon: BillingIcon,
      label: "Billing",
      href: "/recruiter/billings",
    },
  ];

  const managerRoutes = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/manager",
      type: "homePage",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/manager/jobs",
    },
    {
      icon: Tag,
      label: "Tags",
      href: "/manager/tags",
    },
    {
      icon: BillingIcon,
      label: "Billing",
      href: "/manager/billing",
    },
    {
      subheading: "USERS",
    },
    {
      icon: HeartHandshakeIcon,
      label: "Recruiting Companies",
      href: "/manager/recruiting-companies",
    },
    {
      icon: ThreePeopleIcon,
      label: "Team Leads",
      href: "/manager/team-leads",
    },
    {
      icon: Users,
      label: "Candidates",
      href: "/manager/candidates",
    },
  ];

  const teamLeadRoutes = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/teamlead",
      type: "homePage",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/teamlead/jobs",
    },
    {
      icon: Tag,
      label: "Tags",
      href: "/teamlead/tags",
    },
    {
      icon: Users,
      label: "Candidates",
      href: "/teamlead/candidates",
    },
  ];

  const adminRoutes = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/admin",
      type: "homePage",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/admin/jobs",
    },
    {
      icon: Tag,
      label: "Tags",
      href: "/admin/tags",
    },
    {
      icon: BillingIcon,
      label: "Billing",
      href: "/admin/billing",
    },
    {
      subheading: "USERS",
    },
    {
      icon: HeartHandshakeIcon,
      label: "Recruiting Companies",
      href: "/admin/recruitment-partners",
    },
    {
      icon: Joystick,
      label: "Managers",
      href: "/admin/managers",
    },
    {
      icon: ThreePeopleIcon,
      label: "Team Leads",
      href: "/admin/team-leads",
    },
    {
      icon: Users,
      label: "Candidates",
      href: "/admin/candidates",
    },
  ];
  const routesWithoutNotificationCount = (() => {
    switch (role) {
      case "candidate":
        return candidateRoutes;
      case "recruiter":
        return recruiterRoutes;
      case "manager":
        return managerRoutes;
      case "teamlead":
        return teamLeadRoutes;
      case "admin":
        return adminRoutes;
    }
  })();

  // notification count needs to embed inside routes
  let routes = routesWithoutNotificationCount;

  if (data) {
    const {
      jobCount,
      interviewcount,
      chatCount,
      tagCount,
      candidateCount,
      teamLeadCount,
      companyCount,
      recruiterCount,
    } = data;
    routes = routesWithoutNotificationCount?.map(({ label }, index) => {
      switch (label) {
        case "Tags":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: tagCount,
          };
        case "Chat":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: chatCount,
          };
        case "Interviews":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: interviewcount,
          };
        case "Jobs":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: jobCount,
          };
        case "Candidates":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: candidateCount,
          };
        case "Team Leads":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: teamLeadCount,
          };
        case "Recruiting Companies":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: role === "admin" ? companyCount : recruiterCount,
          };
        case "Urgent requirement":
          return {
            ...routesWithoutNotificationCount[index],
            notificationCount: tagCount,
          };

        default:
          return routesWithoutNotificationCount[index];
      }
    });
  }

  return { routes };
};

export default useGetSidebarRoutes;

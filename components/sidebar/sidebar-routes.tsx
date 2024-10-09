import { LogOut, LucideIcon } from "lucide-react";

import SidebarItem from "./sidebar-item";
import storage from "@/utils/storage";
import { FC, Fragment, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import AvatarProfileFallback from "../avatar-profile-fallback";
import { cn } from "@/utils/cnHelper";
import LogoutPopup from "../layout/logout-popup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useLogout } from "@/features/auth/api/logout";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";
import useGetSidebarRoutes from "@/utils/hooks/useGetSidebarRoutes";

const MenuIcon = ({ icon }: { icon: LucideIcon | FC<{}> }) => {
  const Icon = icon;
  return <Icon size={22} className="text-white" />;
};

const SidebarRoutes = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useLogout();

  const router = useRouter();
  const { role } = useGetInfoFromCookie();
  const { routes } = useGetSidebarRoutes();

  const { userDetails } = storage.getDatafromCookie("user_data") || {};

  const profilePicAndName = (
    <>
      {" "}
      <Avatar
        className={cn(
          "h-6 w-6 transition-all duration-500 ",
          role === "candidate" && "",
        )}
      >
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${userDetails?.profilePhoto?.storageName}`}
        />
        <AvatarProfileFallback />
      </Avatar>{" "}
      <p className="pointer-events-none transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 lg:-translate-x-5 lg:opacity-0">
        {" "}
        {userDetails?.fullName}{" "}
      </p>
    </>
  );

  const handleLogout = () => {
    storage.clearCookies("user_data");
    router.push("/");
    toast.success("Logout Successfully");
    setShowLogoutPopup(false);
    queryClient.removeQueries();
    mutate(); // mutate is called to acknowledge the server that user has logged out
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <>
      <div className="flex h-full flex-col justify-between gap-14">
        <div className="flex w-full flex-col px-5">
          {routes?.map((route: any) => {
            if (route.subheading)
              return (
                <div className="pointer-events-none mb-2.5 mt-1.5 px-2 text-xs font-medium text-gray-400 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 lg:-translate-x-5">
                  {route.subheading}
                </div>
              );
            return (
              <Fragment key={route.href}>
                <SidebarItem href={route.href} type={route?.type}>
                  <MenuIcon icon={route.icon} />
                  <div className="pointer-events-none flex grow items-center justify-between gap-4 transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 lg:-translate-x-5 lg:opacity-0">
                    <p className="">{route.label}</p>
                    {route?.notificationCount > 0 && (
                      <span className="relative h-[26px] w-[26px] overflow-hidden rounded-full bg-brand-blue-light">
                        <span className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-sm font-bold">
                          {route.notificationCount}
                        </span>
                      </span>
                    )}{" "}
                  </div>
                </SidebarItem>
              </Fragment>
            );
          })}
        </div>

        <div className="px-5">
          <SidebarItem
            href={
              role === "candidate"
                ? "/candidate/profile"
                : role === "recruiter" && "/recruiter/profile"
            }
            className=""
          >
            {profilePicAndName}
          </SidebarItem>

          <div
            onClick={() => {
              setShowLogoutPopup(true);
            }}
          >
            <SidebarItem key={"/logout"} href={false}>
              <MenuIcon icon={LogOut} />
              <p className="transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 lg:-translate-x-5 lg:opacity-0">
                Logout
              </p>
            </SidebarItem>
          </div>
        </div>
      </div>
      <LogoutPopup
        onLogout={handleLogout}
        onCancel={handleCancelLogout}
        isOpen={showLogoutPopup}
        setOpen={setShowLogoutPopup}
      />
    </>
  );
};

export default SidebarRoutes;

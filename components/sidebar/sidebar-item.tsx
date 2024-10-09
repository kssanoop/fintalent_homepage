import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/cnHelper";
import React, { ReactNode, useEffect } from "react";

interface SidebarItemProps {
  href: string | false;
  type?: "homePage" | "other";
  children: ReactNode;
  className?: string;
}

const SidebarItem = ({
  href,
  type = "other",
  children,
  className,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (href) router.prefetch(href);
  }, [href, router]);

  // NOTE: if type homepage, isActive logic has to be different
  const isActive =
    type === "homePage" ? pathname === href : pathname?.startsWith(`${href}`);
  const onClick = () => {
    if (!href) {
      return;
    }
    // if (href === "logout") {
    //   mutate();
    //   storage.clearCookies("user_data");
    //   queryClient.removeQueries();
    //   router.push("/");
    // } else {
    //   router.push(href);
    // }
    if (href !== "logout") {
      router.push(href);
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        " mb-2.5 flex w-full items-center rounded p-2 text-base text-white transition-[width] duration-1000 group-hover:w-full",
        isActive && "bg-white/20 font-semibold",
        href && " font-normal hover:bg-white/20 hover:font-semibold",
        className,
      )}
    >
      <div className="flex grow items-center gap-x-2 whitespace-nowrap transition-[gap] duration-1000 lg:gap-x-0 lg:group-hover:gap-x-2">
        {children}
      </div>
    </button>
  );
};

export default SidebarItem;

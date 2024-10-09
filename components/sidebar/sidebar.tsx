import { useRouter } from "next/router";
import Logo from "../logo/brand-logo";
import SidebarRoutes from "./sidebar-routes";
import { ChevronRight } from "lucide-react";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";

const Sidebar = () => {
  const router = useRouter();
  const { role } = useGetInfoFromCookie();
  return (
    <div
      style={{
        backgroundColor: "rgb(144,20,82)",
        background:
          "linear-gradient(0deg, rgba(144,20,82,1) 0%, rgba(30,16,87,1) 100%)",
      }}
      className={`group flex h-full flex-col items-center bg-gradient-to-b from-[#012A59] to-[#B21450] px-1.5  py-5 text-white transition-all duration-500 md:h-screen lg:w-[88px] ${role === "admin" || role === "manager" ? "lg:hover:w-[264px]" : "lg:hover:w-[250px]"} `}
    >
      <div className="mb-10 flex w-full items-center transition-all duration-500 group-hover:w-full group-hover:px-6 lg:w-10">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="mx-1 w-full cursor-pointer lg:w-0 lg:group-hover:w-[calc(100%-20px)]"
        >
          <Logo />
        </div>
        <ChevronRight className="hidden size-5 min-w-5 transition-all duration-500 group-hover:rotate-180 lg:block" />
      </div>

      <div className="scroll-container flex w-full grow flex-col overflow-y-auto overflow-x-hidden">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;

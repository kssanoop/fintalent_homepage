import { usePathname } from "next/navigation";
import MobileSidebar from "../../sidebar/mobile-sidebar";
import NotificationButton from "@/components/notification/notification-button";

interface HeadProps {
  lastUpdated?: string;
  heading: string;
}
const Head = ({ lastUpdated, heading }: HeadProps) => {
  const formatDateShow = (lastUpdated: string) => {
    const date = new Date(lastUpdated);
    return `${String(date.getDate())} ${String(
      date.toLocaleString("en-US", { month: "short" }),
    )}, ${date.getFullYear()}`;
  };

  const pathName = usePathname();

  return (
    <div className="flex min-h-[62px] items-center justify-between border-secondary bg-white px-5">
      <div className="hidden items-end gap-2 lg:flex">
        <h1 className="text-xl font-bold text-[#171717]">{heading}</h1>
        {pathName === "/candidate/profile" && lastUpdated && (
          <p className="text-sm text-[#5E5E5E]">
            last updated on {formatDateShow(lastUpdated)}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 lg:hidden">
        <div className="flex items-center gap-2 text-xl font-bold text-[#171717]">
          <MobileSidebar />
          <h1>{heading}</h1>
        </div>
        <div className="px-8">
          {pathName === "/candidate/profile" && lastUpdated && (
            <p className="text-sm font-normal text-[#5E5E5E]">
              last updated on {formatDateShow(lastUpdated)}
            </p>
          )}
        </div>
      </div>
      <NotificationButton />
    </div>
  );
};

export default Head;

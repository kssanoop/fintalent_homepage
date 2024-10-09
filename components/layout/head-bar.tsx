import { usePathname } from "next/navigation";
import AddJobSheet from "../job/job-postings/add-job-sheet";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { Button } from "../ui/button";
import { AddNewTags } from "../Admin/tags/add-new-tags";
import NotificationButton from "../notification/notification-button";

type HeadBarProps = {
  heading: string;
  customRightSideComponent?: React.JSX.Element;
};

const HeadBar = ({ heading, customRightSideComponent }: HeadBarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[62px] items-center justify-between border-b border-border bg-white px-5">
      <HeadBar.Heading heading={heading} />
      {customRightSideComponent || (
        <div className="flex items-center gap-[14px]">
          <NotificationButton />

          {pathname === "/admin/managers" && (
            <Button variant="gradient">Add Manager</Button>
          )}

          {pathname === "/recruiter/jobs" && (
            <div className="md:hidden">
              <AddJobSheet />
            </div>
          )}
          {pathname === "/admin/tags" && (
            <div className="">
              <AddNewTags />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

HeadBar.displayName = "HeadBar";

const HeadBarHeading = ({ heading }: { heading: string }) => {
  return (
    <>
      <h1 className="hidden text-xl font-bold text-[#171717] lg:block">
        {heading}
      </h1>
      <div className="flex items-center gap-2 text-xl font-bold text-[#171717] lg:hidden">
        <MobileSidebar />
        <h1>{heading}</h1>
      </div>
    </>
  );
};

HeadBar.Heading = HeadBarHeading;

export default HeadBar;

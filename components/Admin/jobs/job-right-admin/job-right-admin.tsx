import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import InviteAcceptedCadidatesTabAdmin from "./invite-accepted-tab";
import InvitedCandidatesTabAdmin from "./invitedCandidatesTab";
import InterviewScheduledCandidatesTabAdmin from "./interview-scheduled-tab";
import ShorlistedCandidatesTabAdmin from "./shortlisted-candidates-tab-admin";
import OfferedCandidatesTabAdmin from "./offered-jobs-tab-admin";
import RejectedCandidatesTabAdmin from "./rejected-candidates-tab-admin";
import HiredCandidatesTabAdmin from "./hired-candidated-tab-admin";

interface JobRightProps {
  Interface?: string;
}

const JobRightAdmin = ({ Interface }: JobRightProps) => {
  const TABS = [
    {
      label: "Invited",
      slug: "invited",
      content: <InvitedCandidatesTabAdmin />,
    },
    {
      label: "Invite Accepted",
      slug: "invite-accepted",
      content: <InviteAcceptedCadidatesTabAdmin />,
    },
    {
      label: "Interview scheduled",
      slug: "interview-scheduled",
      content: <InterviewScheduledCandidatesTabAdmin />,
    },
    {
      label: "Shortlisted",
      slug: "shortlisted",
      content: <ShorlistedCandidatesTabAdmin />,
    },
    {
      label: "Offered",
      slug: "offered",
      content: <OfferedCandidatesTabAdmin />,
    },
    {
      label: "Hired",
      slug: "hired",
      content: <HiredCandidatesTabAdmin />,
    },
    {
      label: "Rejected",
      slug: "rejected",
      content: <RejectedCandidatesTabAdmin />,
    },
  ];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("type") || TABS[0].slug;
  return (
    <Tabs value={defaultTab} className="h-full">
    <TabsList className="mb-2.5 flex h-auto w-[100vw] -translate-y-1.5 justify-start gap-[18px]  overflow-x-auto rounded-none border-b border-[#E1E1E1] bg-inherit p-0  pl-2  md:inline-flex md:w-full md:pl-0">
        {TABS.map(({ label, slug }) => (
          <Link key={label} href={`${pathname}?type=${slug}`}>
            <TabsTrigger
              value={slug}
              className="text-brand rounded-none px-0  pb-[14px] pt-0 text-left  text-base text-brand-black data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold data-[state=active]:text-[#012A59]  "
            >
              {label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
      {TABS.map(({ label, slug, content }) => (
        <TabsContent key={label} value={slug}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default JobRightAdmin;

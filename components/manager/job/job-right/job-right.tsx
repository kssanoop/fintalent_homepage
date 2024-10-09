import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import InvitedCandidatesTabManager from "./invitedCandidatesTabManager";
import InviteAcceptedCadidatesTabManager from "./invite-accepted-tab-manager";
import InterviewScheduledCandidatesTabManager from "./interview-scheduled-tab-manager";
import ShorlistedCandidatesTabManager from "./shortlisted-candidates-tab-admin";
import HiredCandidatesTabManager from "./hired-candidated-tab-manager";
import RejectedCandidatesTabManager from "./rejected-candidates-tab-manager";
import OfferedCandidatesTabAdmin from "./offered-jobs-tab-admin";

const JobRight = () => {
  const TABS = [
    {
      label: "Invited",
      slug: "invited",
      content: <InvitedCandidatesTabManager />,
    },
    {
      label: "Invite Accepted",
      slug: "invite-accepted",
      content: <InviteAcceptedCadidatesTabManager />,
    },
    {
      label: "Interview scheduled",
      slug: "interview-scheduled",
      content: <InterviewScheduledCandidatesTabManager />,
    },
    {
      label: "Shortlisted",
      slug: "shortlisted",
      content: <ShorlistedCandidatesTabManager />,
    },
    {
      label: "Offered",
      slug: "offered",
      content: <OfferedCandidatesTabAdmin />,
    },
    {
      label: "Hired",
      slug: "hired",
      content: <HiredCandidatesTabManager />,
    },
    {
      label: "Rejected",
      slug: "rejected",
      content: <RejectedCandidatesTabManager />,
    },
  ];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("type") || TABS[0].slug;
  return (
    <Tabs
      value={defaultTab}
      className="h-full bg-background md:bg-white md:px-0 "
    >
      <TabsList className="mb-4 flex h-auto w-[100vw] justify-start  gap-[18px] overflow-x-auto rounded-none border-b border-[#E1E1E1] bg-inherit p-0  pl-2  md:inline-flex md:w-full md:pl-0">
        {TABS.map(({ label, slug }) => (
          <Link key={label} href={`${pathname}?type=${slug}`}>
            <TabsTrigger
              value={slug}
              className="text-brand rounded-none px-0 pb-[14px]  text-left data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold data-[state=active]:text-[#012A59]  "
            >
              {label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
      {TABS.map(({ label, slug, content }) => (
        <TabsContent key={label} value={slug} className="px-2 md:px-0">
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default JobRight;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import InvitedCandidatesTabTeamLead from "./invited-candidates-tab-team-lead";
import InviteAcceptedCadidatesTabTeamLead from "./invite-accepted-tab-team-lead";
import InterviewScheduledCandidatesTabTeamLead from "./interview-scheduled-tab-team-lead";
import ShorlistedCandidatesTabTeamLead from "./shortlisted-candidates-tab-team-lead";
import OfferedCandidatesTabTeamLead from "./offered-candidates-tab-team-lead";
import HiredCandidatesTabTeamLead from "./hired-candidated-tab-team-lead";
import RejectedCandidatesTabTeamLead from "./rejected-candidates-tab-team-lead";

const JobRight = () => {
  const TABS = [
    {
      label: "Invited",
      slug: "invited",
      content: <InvitedCandidatesTabTeamLead />,
    },
    {
      label: "Invite Accepted",
      slug: "invite-accepted",
      content: <InviteAcceptedCadidatesTabTeamLead />,
    },
    {
      label: "Interview scheduled",
      slug: "interview-scheduled",
      content: <InterviewScheduledCandidatesTabTeamLead />,
    },
    {
      label: "Shortlisted",
      slug: "shortlisted",
      content: <ShorlistedCandidatesTabTeamLead />,
    },
    {
      label: "Offered",
      slug: "offered",
      content: <OfferedCandidatesTabTeamLead />,
    },
    {
      label: "Hired",
      slug: "hired",
      content: <HiredCandidatesTabTeamLead />,
    },
    {
      label: "Rejected",
      slug: "rejected",
      content: <RejectedCandidatesTabTeamLead />,
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
        <TabsContent key={label} value={slug} className="px-2 md:px-0">
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default JobRight;

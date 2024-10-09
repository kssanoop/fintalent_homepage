import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import HeadBar from "@/components/layout/head-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import AllCandidatesTab from "@/components/recruiter/candidates/all-candidates-tab/all-candidates-tab";
import HiredCandidatesTab from "@/components/recruiter/candidates/hired-candidates-tab/hired-candidates-tab";
import MyHiresTab from "@/components/recruiter/candidates/my-hires-tab/my-hires-tab";
import useGetUnhiredCandidates from "@/features/get-candidates/api/get-unhired-candidates";
import useGetHiredCandidates from "@/features/get-candidates/api/get-hired-candidate";
import useGetMyCandidates from "@/features/get-candidates/api/get-my-candidates";

const useGetTabs = () => {
  const { data: unhiredCandidates } = useGetUnhiredCandidates({ search: "" });
  const noOfAllCandidates = unhiredCandidates?.pages[0].count;

  const { data: hiredCandidates } = useGetHiredCandidates();
  const noOfHiredCandidates = hiredCandidates?.length;

  const { data: myCandidates } = useGetMyCandidates();
  const noOfMyCandidates = myCandidates?.length;

  const tabs = [
    {
      label: `All Candidates (${noOfAllCandidates ?? 0})`,
      slug: "all-candidates",
      content: <AllCandidatesTab />,
    },
    {
      label: `Platform Hiring (${noOfHiredCandidates ?? 0})`,
      slug: "hired-candidates",
      content: <HiredCandidatesTab />,
    },
    {
      label: `My Hiring (${noOfMyCandidates ?? 0})`,
      slug: "my-hires",
      content: <MyHiresTab />,
    },
  ];
  return { tabs };
};

const Candidates = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { tabs: TABS } = useGetTabs();
  const defaultTab = searchParams.get("type") || TABS[0].slug;

  return (
    <Tabs value={defaultTab} className="h-full">
      <TabsList className="mb-3 w-full justify-start gap-[18px] rounded-none bg-inherit px-0">
        {TABS.map(({ label, slug }) => (
          <Link key={label} href={`${pathname}?type=${slug}`}>
            <TabsTrigger
              value={slug}
              className="text-brand rounded-none px-0 py-2 text-left  text-base data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold data-[state=active]:text-[#012A59]  "
            >
              {label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
      {TABS.map(({ label, slug, content }) => (
        <TabsContent key={label} value={slug} className="h-[calc(100%-68px)]">
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

Candidates.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar heading="Candidates" />

          <div className="scroll-container grow overflow-y-auto px-5 py-2 ">
            {page}
          </div>
        </div>
      </Layout>
    </Authorization>
  );
};

export default Candidates;

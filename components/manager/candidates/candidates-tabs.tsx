import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import AllCandidatesTab from "@/components/Admin/candidates/all-candidate/all-candidates-tab";
import AdminHiredCandidatesTabs from "@/components/Admin/candidates/hired-candidates/hired-candidates-tab";
import useGetAllCandidateCountsAdmin from "@/features/get-candidates/admin/api/get-all-candidate-count";
import ReopenRequestTabAdmin from "@/components/Admin/candidates/reopen-request/reopen-request-tab-admin";
import { useGetCandidatesForReopenRequest } from "@/features/get-candidates/admin/api/get-candidates-for-reopen-request";
import { useGetHiredCandidatesAdmin } from "@/features/get-candidates/admin/api/get-hired-candidates";

const CandidatesTabs = () => {
  const { data: unhiredCandidate } = useGetAllCandidateCountsAdmin();
  // console.log("length count data:", unhiredCandidate?.length);
  const { data: reopenRequests } = useGetCandidatesForReopenRequest();
  // console.log("length count data:",  pendingCandidates?.length);

  const { data: hiredCandidates } = useGetHiredCandidatesAdmin();

  const TABS = [
    {
      label: `All candidates (${unhiredCandidate?.length ?? 0})`,
      slug: "all-candidates",
      content: <AllCandidatesTab />,
    },
    {
      label: `Platform Hiring (${hiredCandidates?.length ?? 0})`,
      slug: "hired-candidates",
      content: <AdminHiredCandidatesTabs />,
    },
    {
      label: `Reopen Requests (${reopenRequests?.length ?? 0})`,
      slug: "reopen-requests",
      content: <ReopenRequestTabAdmin />,
    },
  ];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("type") || TABS[0].slug;

  return (
    <>
      <Tabs value={defaultTab} className="h-[cal(100%-10px)] bg-white">
        <TabsList className="mb-3 w-full justify-start gap-[15px] overflow-hidden overflow-x-auto rounded-none border-b border-[#E1E1E1] bg-inherit px-5">
          {TABS.map(({ label, slug }) => (
            <Link key={label} href={`${pathname}?type=${slug}`}>
              <TabsTrigger
                value={slug}
                className="text-brand rounded-none px-0 pb-2 pt-2  text-left data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold data-[state=active]:text-[#012A59] "
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
    </>
  );
};

export default CandidatesTabs;

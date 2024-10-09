import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import { usePathname, useRouter } from "next/navigation";
import HeadBar from "@/components/layout/head-bar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Bell from "@/components/bell";
import CandidatesTabs from "@/components/candidates-tab/candidates-tabs";
import ReopenRequestTabAdmin from "@/components/Admin/candidates/reopen-request/reopen-request-tab-admin";
import useGetAllCandidateCountsAdmin from "@/features/get-candidates/admin/api/get-all-candidate-count";
import TeamLeadAllCandidatesTab from "@/components/team-lead/candidates/all-candidate/team-lead-all-candidates-tab";
import TeamLeadHiredCandidatesTabs from "@/components/team-lead/candidates/hired-candidates/team-lead-hired-candidates-tab";
import { useGetCandidatesForReopenRequest } from "@/features/get-candidates/admin/api/get-candidates-for-reopen-request";
import { useGetHiredCandidatesAdmin as useGetHiredCandidatesTeamLead } from "@/features/get-candidates/admin/api/get-hired-candidates";
import PendingCandidateTableData from "@/components/Admin/candidates/pending-candidates/pending-candidate-table-data";
import { useGetAllPendingCandidatesAdmin } from "@/features/get-candidates/admin/api/get-all-pending-candidates-admin";

const TeamLeadCandidates = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: unhiredCandidate } = useGetAllCandidateCountsAdmin();
  const { data: reopenRequests } = useGetCandidatesForReopenRequest();
  const { data: hiredCandidates } = useGetHiredCandidatesTeamLead();
  const { data: pendingCandidates } = useGetAllPendingCandidatesAdmin();

  const tabs = [
    {
      label: `All candidates (${unhiredCandidate?.length ?? 0})`,
      slug: "all-candidates",
      content: <TeamLeadAllCandidatesTab />,
    },
    {
      label: `Platform Hiring (${hiredCandidates?.length ?? 0})`,
      slug: "hired-candidates",
      content: <TeamLeadHiredCandidatesTabs />,
    },
    {
      label: `Reopen Requests (${reopenRequests?.length ?? 0})`,
      slug: "reopen-requests",
      content: <ReopenRequestTabAdmin />,
    },
    {
      label: `Pending requests (${pendingCandidates?.length ?? 0})`,
      slug: "pending-requests",
      content: <PendingCandidateTableData />,
    },
  ];

  const handleRedirecting = () => {
    router.push(`${pathname}/add-new-candidate`);
  };
  return (
    <>
      <div className="flex h-screen w-full flex-col bg-white">
        <HeadBar
          heading="Candidates"
          customRightSideComponent={
            <div className="flex gap-[18px]">
              <Bell />
              <Button
                className="px-3 py-1.5 text-base font-bold"
                variant="gradient"
                onClick={() => {
                  handleRedirecting();
                }}
              >
                Add new Candidate <Plus color="#fff" size={22} />
              </Button>
            </div>
          }
        />
        <div className="pr-5">
          <CandidatesTabs tabs={tabs} />
        </div>
      </div>
    </>
  );
};

TeamLeadCandidates.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.TEAM_LEAD} can view this.</div>}
      allowedRoles={[ROLES.TEAM_LEAD]}
    >
      <Layout>
        <ErrorBoundary
          fallback={
            <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
              Something went wrong! Unable to fetch data.
            </div>
          }
          onError={(error: any, errorInfo) => {
            console.log("Error caught!", error);
          }}
        >
          <div className="flex h-full w-full overflow-auto">{page}</div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};

export default TeamLeadCandidates;

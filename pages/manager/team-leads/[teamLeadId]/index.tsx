import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import { ErrorBoundary } from "react-error-boundary";
import { ChevronLeft } from "lucide-react";
import ContainerOnlyHeadBar from "@/components/layout/container-only-head-bar";
import Link from "next/link";
import { useRouter } from "next/router";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import TeamLeadInfoCard from "@/components/Admin/team-leads/team-lead-info/team-lead-info-card/team-lead-info-card";
import TeamLeadCandidatesContainer from "@/components/Admin/team-leads/team-lead-info/team-lead-candidates-container";
import TeamLeadAssignCandidateSheet from "@/components/Admin/team-leads/team-lead-info/assign-candidates-sheet";
import useGetTeamLeadsForManager from "@/features/managers/api/get-team-leads-for-manager";

const useGetTeamLead = () => {
  const router = useRouter();
  const teamLeadId = router.query.teamLeadId as string;

  const result = useGetTeamLeadsForManager();
  const teamLead = result.data?.find(
    (teamLead) => teamLead.teamLeadId === teamLeadId,
  );
  return { ...result, data: teamLead };
};

const TeamLeadId = () => {
  const { data: teamLead, isLoading } = useGetTeamLead();
  console.log(teamLead);

  if (isLoading && !teamLead) {
    return (
      <>
        <InfoCardSkeleton />
      </>
    );
  }

  if (!teamLead) {
    return (
      <h1 className="mt-4 text-center text-xl text-brand-blue">
        Team lead Not found
      </h1>
    );
  }

  return (
    <>
      <TeamLeadInfoCard teamLead={teamLead} role="manager" />
      <div className="flex grow gap-6 overflow-auto">
        <TeamLeadCandidatesContainer teamLeadId={teamLead.teamLeadId} />
      </div>
    </>
  );
};

const SheetWrapper = () => {
  const { data: teamLead } = useGetTeamLead();
  if (teamLead) {
    return (
      <>
        <TeamLeadAssignCandidateSheet teamLeadName={teamLead.name} />
      </>
    );
  }
};

TeamLeadId.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Authorization
        forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
        allowedRoles={[ROLES.MANAGER]}
      >
        <Layout>
          <div className="bg-default-gray flex h-screen w-full flex-col">
            <ContainerOnlyHeadBar>
              <Link
                href="/manager/team-leads"
                className="flex cursor-pointer items-center gap-1 text-xl font-bold text-brand-black"
              >
                <ChevronLeft size={16} />
                <p>Go back</p>
              </Link>
              <SheetWrapper />
            </ContainerOnlyHeadBar>
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
              <div className="scroll-container flex grow flex-col gap-3 overflow-y-auto bg-white px-5 py-3">
                {page}
              </div>
            </ErrorBoundary>
          </div>
        </Layout>
      </Authorization>
    </>
  );
};

export default TeamLeadId;

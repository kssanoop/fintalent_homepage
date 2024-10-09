import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import { ErrorBoundary } from "react-error-boundary";
import { ChevronLeft } from "lucide-react";
import ContainerOnlyHeadBar from "@/components/layout/container-only-head-bar";
import ManagerInfoCard from "@/components/Admin/managers/manager-info/manager-info-card/manager-info-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import TeamLeadsTabContent from "@/components/Admin/managers/manager-info/team-leads-tab-content/team-leads-tab-content";
import useGetManagersForAdmin from "@/features/admin/manager/api/get-managers-for-admin";
import { useRouter } from "next/router";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import AssignToManager from "@/components/Admin/managers/assign-to-manager/assign-to-manager";
import RecruitmentCompaniesTabContent from "@/components/Admin/managers/manager-info/recruitment-companies-tab-content/recruitment-companies-tab-content";

const TABS = [
  {
    label: "Team Leads",
    slug: "team-leads",
    content: <TeamLeadsTabContent />,
  },
  {
    label: "Recruitment companies",
    slug: "recruitment-companies",
    content: (
      <div className="hide-scrollbar  h-full overflow-auto">
        <RecruitmentCompaniesTabContent />
      </div>
    ),
  },
];

const ManagerId = () => {
  const router = useRouter();
  const managerId = router.query.managerId as string;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("type") || TABS[0].slug;
  const filters = searchParams.get("filters");
  const parsedFilters = filters ? JSON.parse(filters) : undefined;
  const { data: managers, isLoading } = useGetManagersForAdmin(parsedFilters);
  const manager = managers?.find((manager) => manager.managerId === managerId);

  if (isLoading && !manager) {
    return (
      <>
        <InfoCardSkeleton />
      </>
    );
  }

  if (!manager) {
    return (
      <h1 className="mt-4 text-center text-xl text-brand-blue">
        Manager Not found
      </h1>
    );
  }

  return (
    <>
      <ManagerInfoCard manager={manager} />
      {manager.docStatus === "active" ? (
        <Tabs
          defaultValue={defaultTab}
          className="m-0 flex grow flex-col gap-4 p-0"
        >
          <TabsList className=" flex h-auto justify-start gap-3  rounded-none bg-inherit p-0">
            {TABS.map(({ label, slug }) => (
              <Link key={label} href={`${pathname}?type=${slug}`}>
                <TabsTrigger
                  value={slug}
                  className="h-[50px] rounded-none p-0 text-left text-base font-medium text-brand-black data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold data-[state=active]:text-[#012A59]  "
                >
                  {label}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
          {TABS.map(({ label, slug, content }) => (
            <TabsContent
              key={label}
              value={slug}
              className="m-0 grow overflow-auto"
            >
              {content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="mt-[100px] text-center text-sm font-medium text-brand-black">
          This account is currently inactive
        </div>
      )}
    </>
  );
};

ManagerId.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Authorization
        forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <Layout>
          <div className="bg-default-gray flex h-screen w-full flex-col">
            <ContainerOnlyHeadBar>
              <Link
                href="/admin/managers"
                className="flex cursor-pointer items-center gap-1 text-xl font-bold text-brand-black"
              >
                <ChevronLeft size={16} />
                <p>Go back</p>
              </Link>
              <AssignToManager />
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

export default ManagerId;

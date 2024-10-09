import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import CandidatesTabs from "@/components/manager/candidates/candidates-tabs";
import { usePathname, useRouter } from "next/navigation";
import HeadBar from "@/components/layout/head-bar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NotificationButton from "@/components/notification/notification-button";
const AdminCandidates = () => {
  // const [openAddCandidateForm, setOpenAddCandidateForm] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleRedirecting = () => {
    router.push(`${pathname}/add-new-candidate`);
  };
  return (
    <>
      <div className="flex h-full w-full flex-col">
        <HeadBar
          heading="Candidates"
          customRightSideComponent={
            <div className="flex items-center gap-5">
              <NotificationButton />

              <Button
                className="px-3 py-1.5 text-base font-bold"
                variant="gradient"
                onClick={handleRedirecting}
              >
                Add new Candidate <Plus color="#fff" size={22} />
              </Button>
            </div>
          }
        />
        <div className="pr-5">
          <CandidatesTabs />
        </div>
      </div>
    </>
  );
};

AdminCandidates.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
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

export default AdminCandidates;

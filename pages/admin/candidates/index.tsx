import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import HeaderBar from "@/components/Admin/common/HeaderBar";
import CandidatesTabs from "@/components/Admin/candidates/candidates-tabs";
import { usePathname, useRouter } from "next/navigation";
const AdminCandidates = () => {
  // const [openAddCandidateForm, setOpenAddCandidateForm] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleRedirecting = () => {
    router.push(`${pathname}/add-new-candidate`);
  };
  return (
    <>
      <div className="flex h-screen w-full flex-col bg-white">
        <HeaderBar
          title={"Candidates"}
          showFilter={false}
          buttonText={"Add new Candidate "}
          setOpen={handleRedirecting}
          showButton={true}
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
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
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

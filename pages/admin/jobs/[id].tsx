import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import { ErrorBoundary } from "react-error-boundary";
import JobLeftAdmin from "@/components/Admin/jobs/job-left-admin/job-left-admin";
import JobRightAdmin from "@/components/Admin/jobs/job-right-admin/job-right-admin";

const JobAdmin = () => {
  return (
    <div className="flex h-full flex-col md:flex-row md:gap-4 ">
      <div className="md:w-[24%] md:min-w-[340px]">
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
          <JobLeftAdmin />
        </ErrorBoundary>
      </div>
      <div className="md:w-[76%]">
        <JobRightAdmin />
      </div>
    </div>
  );
};

JobAdmin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
    >
      <Layout>
        <div className="h-screen grow bg-white px-5 py-[27px]">{page}</div>
      </Layout>
    </Authorization>
  );
};

export default JobAdmin;

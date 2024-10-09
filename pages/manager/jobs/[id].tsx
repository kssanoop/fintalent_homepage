import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import { ErrorBoundary } from "react-error-boundary";
import JobRight from "@/components/manager/job/job-right/job-right";
import JobLeft from "@/components/manager/job/job-left/job-left";

const Job = () => {
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
          <JobLeft />
        </ErrorBoundary>
      </div>
      <div className=" md:w-[76%]">
        <JobRight />
      </div>
    </div>
  );
};

Job.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <Layout>
        <div className="h-screen grow bg-white p-0 md:px-5 md:py-[27px]">
          {page}
        </div>
      </Layout>
    </Authorization>
  );
};

export default Job;

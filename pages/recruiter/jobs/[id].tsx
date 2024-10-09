import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import JobLeft from "@/components/recruiter/job/job-left/job-left";
import { ErrorBoundary } from "react-error-boundary";
import JobRight from "@/components/recruiter/job/job-right/job-right";

const Job = () => {
  return (
    <div className="flex h-full flex-col md:gap-4 lg:flex-row ">
      <div className="w-full lg:w-[28%] ">
        <ErrorBoundary
          fallback={
            <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
              Something went wrong!
            </div>
          }
          onError={(error: any, errorInfo) => {
            console.log("Error caught!", error);
          }}
        >
          <JobLeft />
        </ErrorBoundary>
      </div>
      <div className="w-full lg:w-[76%]">
        <JobRight />
      </div>
    </div>
  );
};

Job.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
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

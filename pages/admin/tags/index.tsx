import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import HeadBar from "@/components/layout/head-bar";
import TagsBody from "@/components/Admin/tags";
const AdminTags = () => {
  return (
    <div>
      <TagsBody />
    </div>
  );
};

AdminTags.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.ADMIN} can view this.</div>}
      allowedRoles={[ROLES.ADMIN]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar heading="Tags" />
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
            <div>{page}</div>
          </ErrorBoundary>
        </div>
      </Layout>
    </Authorization>
  );
};

export default AdminTags;

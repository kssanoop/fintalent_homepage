import { ReactElement } from "react";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import Layout from "@/components/layout/primary-layout";
import Head from "@/components/candidate/head/head";
import Body from "@/components/candidate/body/body";

const Candidate = () => {
  return (
    <div className="bg-default-gray flex h-screen w-full flex-col">
      <Head heading={"Dashboard"} />
      <div className="scroll-container px-5 pt-[19px]">
        <Body />
      </div>
    </div>
  );
};

Candidate.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      routeType="private"
      forbiddenFallback={<div>Only {ROLES.CANDIDATE} can view this.</div>}
      allowedRoles={[ROLES.CANDIDATE]}
    >
      <Layout>{page}</Layout>
    </Authorization>
  );
};

export default Candidate;

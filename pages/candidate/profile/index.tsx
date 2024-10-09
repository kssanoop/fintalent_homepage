import { ReactElement, useState } from "react";

import Layout from "@/components/layout/primary-layout";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import Head from "@/components/candidate/head/head";
import Body from "@/components/candidate/profile/body/body";

const Profile = () => {
  const [lastUpdated, setLastUpdated] = useState("");
  return (
    <div className="bg-default-gray flex h-screen w-full flex-col">
      <Head lastUpdated={lastUpdated} heading="Your profile" />
      <div className="grow overflow-y-auto px-5 py-[27px]">
        <Body setLastUpdated={setLastUpdated} />
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div></div>}
      allowedRoles={[ROLES.CANDIDATE]}
    >
      <Layout>{page}</Layout>
    </Authorization>
  );
};

export default Profile;

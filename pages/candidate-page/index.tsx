import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layout/MainLayout";

import CandidatePage from "@/components/website/pageComponents/CandidatePage";
import Head from "next/head";

const CandidateLogiUi: NextPageWithLayout = () => {
  return (
    <>
      <CandidatePage />
    </>
  );
};

CandidateLogiUi.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Candidate | Fintalent</title>
        <meta
          name="description"
          content="Discover the step-by-step process to unleash your potential with Fintalent. Join our exclusive invite-only community, where recruiters connect directly with candidates based on their profile score. Create your profile, receive job invites, schedule interviews, receive offers, and start your dream career."
        />
      </Head>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default CandidateLogiUi;

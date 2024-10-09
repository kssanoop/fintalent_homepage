import { ReactElement } from "react";
import MainLayout from "@/components/layout/MainLayout";
import RecruiterPage from "@/components/website/pageComponents/RecruiterPage";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";

const recruiterUi: NextPageWithLayout = () => {
  return (
    <>
      <RecruiterPage />
    </>
  );
};

recruiterUi.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Recruiter | Fintalent</title>
        <meta
          name="description"
          content="Discover top finance and accounting professionals with Fintalent. Our platform connects recruiters directly with skilled candidates, providing a streamlined hiring process. Learn how to shortlist candidates, conduct interviews, and make instant hires. Benefit from pre-screened profiles, relevant search filters, automated video interviews, reduced bench costs, and speedy recruitment."
        />
      </Head>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default recruiterUi;

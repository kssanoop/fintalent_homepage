import { ReactElement } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ServicesPage from "@/components/website/pageComponents/ServicesPage";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";

const servicesUi: NextPageWithLayout = () => {
  return (
    <>
      <ServicesPage />
    </>
  );
};

servicesUi.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Services | Fintalent</title>
        <meta
          name="description"
          content="Explore Fintalent's range of services designed to revolutionize your hiring process, address seasonal staffing needs with contractual employees, and empower your team through practical and tailored corporate training in accounting. Enhance your workforce with our platform's algorithm-driven candidate acquisition and specialized solutions."
        />
      </Head>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default servicesUi;

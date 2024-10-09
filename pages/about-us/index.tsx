import { ReactElement } from "react";

import AboutUsPage from "@/components/website/pageComponents/AboutUsPage";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

const AboutUs: NextPageWithLayout = () => {
  return (
    <>
      <AboutUsPage />
    </>
  );
};

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>About Us | Fintalent</title>
        <meta
          name="description"
          content="Discover the story of Fintalent - a platform connecting companies with top-tier finance and accounting professionals. Learn about our mission, values, and commitment to fostering growth through skilled and reliable talent."
        />
      </Head>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default AboutUs;

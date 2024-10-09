import { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layout/MainLayout";
import ContactUsPage from "@/components/website/pageComponents/ContactUsPage";
import Head from "next/head";

const ContactUs: NextPageWithLayout = () => {
  return (
    <>
      <ContactUsPage />
    </>
  );
};

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Contact Us | Fintalent</title>
        <meta
          name="description"
          content="Get in touch with Fintalent's team. Reach out for partnership opportunities, inquiries, or any questions you may have about our platform. We value your feedback and are here to assist you."
        />
      </Head>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default ContactUs;

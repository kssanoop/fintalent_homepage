import MainLayout from "@/components/layout/MainLayout";

import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import HomePage from "@/components/website/pageComponents/HomePage";
import Head from "next/head";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <HomePage />
    </>
  );
};
// const queryClient = useQueryClient();

// const navs = [
//   {
//     name: "candidate login",
//     href: "/candidate/login",
//   },
//   {
//     name: "recruiter login",
//     href: "/recruiter/login",
//   },
//   {
//     name: "manager login",
//     href: "/manager/login",
//   },
//   {
//     name: "team lead login",
//     href: "/teamlead/login",
//   },
//   {
//     name: "admin login",
//     href: "/admin/login",
//   },
//   {
//     name: "admin forgot password",
//     href: "/admin/forgot-password",
//   },
//   {
//     name: "Logout Role",
//     href: "/",
//   },
// ];

// const handleLogout = (name: String) => {
//   if (name === "Logout Role") {
//     storage.clearCookies("user_data");
//     queryClient.removeQueries();
//     toast.success("Logout Success");
//   }
// };

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Home | Fintalent</title>
        <meta
          name="description"
          content="Fintalent connects companies with top-tier 
              finance and accounting professionals, offering real-world 
              work experience and qualifications."
        />
      </Head>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Home;

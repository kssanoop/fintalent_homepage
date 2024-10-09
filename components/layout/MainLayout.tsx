import React from "react";
import Header from "../website/Header/Header";
import Footer from "../website/Footer/Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col  ">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

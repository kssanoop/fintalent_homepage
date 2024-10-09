import React from "react";
import LandingPage from "../homePageSections/LandingPage";
import ReadyToHire from "../homePageSections/ReadyToHire";
import CardsSection from "../homePageSections/CardsSection";
import WhyHire from "../homePageSections/WhyHire";
import CountUpBand from "../homePageSections/CountUpBand";
import TopTalents from "../homePageSections/TopTalents";
import LastSection from "../homePageSections/LastSection";

const HomePage = () => {
  return (
    <section>
      <LandingPage />
      <ReadyToHire />
      <CardsSection />
      <WhyHire />
      <CountUpBand />
      <TopTalents />
      <LastSection />
    </section>
  );
};

export default HomePage;

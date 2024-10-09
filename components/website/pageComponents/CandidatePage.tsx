import React from "react";
import HeroSection from "../CandidatePageSections/HeroSection";
import { CarouselSection } from "../CandidatePageSections/CarouselSection";
import DreamJob from "../CandidatePageSections/DreamJob";
import InvitedJob from "../CandidatePageSections/InvitedJob";

const CandidatePage = () => {
  return (
    <section>
      <HeroSection />
      <DreamJob />
      <InvitedJob />
      <CarouselSection />
    </section>
  );
};

export default CandidatePage;

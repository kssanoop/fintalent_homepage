import IntroSection from "../AboutUsPageSections/IntroSection";
import LandingSection from "../AboutUsPageSections/LandingSection";
import PinkBanner from "../AboutUsPageSections/PinkBanner";
import ContactUsCard from "../CardComponents/ContactUsCard";

const AboutUsPage = () => {
  return (
    <section>
      <LandingSection />
      <IntroSection />
      <PinkBanner />
      <ContactUsCard />
    </section>
  );
};

export default AboutUsPage;

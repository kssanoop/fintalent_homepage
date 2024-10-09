import Card1 from "../CardComponents/Card1";

import card1 from "@/public/card1.png";
import card2 from "@/public/card2.png";
import card3 from "@/public/card3.png";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const CardsSection = () => {
  return (
    <div className="mt-[50px] w-full">
      <div className="container w-full items-center text-center md:w-[700px]">
        <SlideAnimationWrapper direction="down">
          <span
            className="text-gradient text-strokeWithGradient pr-3 text-[36px] font-[900] "
            style={{ letterSpacing: "1px" }}
          >
            Accelerate
          </span>
          <span className="text-[36px] font-[800] ">
            your access to the Perfect Finance Professionals.
          </span>
        </SlideAnimationWrapper>
      </div>
      <div className=" mx-auto flex  flex-col items-center justify-center gap-8 px-[5vw] md:gap-[26px] lg:flex-row lg:px-[5vw]">
        <Card1
          tb1="Handpicked"
          tb2="Confidence in"
          tb3="Your Shortcut to"
          tl1="Professionals "
          tl2="Quality"
          tl3="Quality Hires"
          imageUrl={card1}
          title="Pre-Vetted Talents"
          description="Discover pre-vetted talents ready to excel. Save time and ensure quality hires with our meticulously curated talent pool"
        />
        <Card1
          title="Diverse Talent Pool"
          description="Work closely with Companies to solve their entry & mid -level talent acquisition needs."
          tb1="Trained & experienced"
          tb2="Pool of Pre-Qualified"
          tb3="Entry & Mid -Level"
          tl1="Candidates"
          tl2="Candidates"
          tl3="Acquisition part"
          imageUrl={card2}
        />
        <Card1
          title="Smart Hiring"
          description="Deploy the right finance professionals quicker than ever before."
          tb1="Save time on campus"
          tb2="0-3 years"
          tb3="Pan-India"
          tl1="Recruitment visits"
          tl2="of experience"
          tl3="Candidates"
          imageUrl={card3}
        />
      </div>
    </div>
  );
};

export default CardsSection;

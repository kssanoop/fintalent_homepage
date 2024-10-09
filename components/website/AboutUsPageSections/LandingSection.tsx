import Image from "next/image";
import manImg from "@/public/aboutusSVGs/img1.svg";
import ladyImg from "@/public/aboutusSVGs/aboutImg2.svg";
import manImbigRes from "@/public/aboutusSVGs/aboutus3.svg";
import underlineImg from "@/public/aboutusSVGs/underlineImg.svg";
import styles from "@/components/website/homePageSections/Section2.module.css";
import SlideAnimation from "../framer-motion-animations/SlideAnimation";

import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const landingSection = () => {
  return (
    <div className="mt-[30px] flex w-full flex-col lg:flex-row lg:px-[5vw]">
      <div className={`  mt-[5rem] hidden lg:flex `}>
        <SlideAnimation
          src={manImbigRes}
          alt="banner img"
          width={500}
          direction="left"
        />
      </div>

      <div className="mx-auto px-[5vw] lg:items-center  lg:px-0">
        <SlideAnimationWrapper direction="down">
          <h1 className="text-stroke-1 mt-[52px]  text-center text-[32px] font-[800] lg:text-[40px]">
            You can have the Right people, Right here
          </h1>
        </SlideAnimationWrapper>
        <div className="mt-7 hidden w-full items-center justify-center lg:flex ">
          <Image src={underlineImg} alt="underline" className="lg:w-[10vw]" />
        </div>
      </div>

      <div className={`  mt-[5rem] hidden lg:flex `}>
        <SlideAnimation
          src={ladyImg}
          alt="float image"
          width={500}
          direction="right"
        />
      </div>

      {/* small screen image */}
      <div
        className={` ${styles.floatanimation} mt-[32px] flex w-full items-center justify-center lg:hidden`}
      >
        <SlideAnimation
          direction="down"
          src={manImg}
          alt="banner img"
          width={523}
          height={229}
        />
      </div>
    </div>
  );
};

export default landingSection;

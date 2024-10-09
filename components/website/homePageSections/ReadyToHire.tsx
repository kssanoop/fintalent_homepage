import React from "react";

import backImgSection2imag2 from "@/public/section2img3.png";
import section2Item1 from "@/public/section2Item1(1).png";
import { Button } from "@/components/ui/button";
import rightArrow from "@/public/Rightarrow.svg";
import Image from "next/image";
import styles from "./Section2.module.css";
import SlideAnimation from "../framer-motion-animations/SlideAnimation";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";
import Link from "next/link";

const ReadyToHire = () => {
  return (
    <div
      className=" flex   "
      style={{
        backgroundImage: `url(${backImgSection2imag2.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="  ">
        <SlideAnimationWrapper
          direction="down"
          className=" container  mx-auto ml-0 flex flex-col items-center py-[80px] sm:px-[7rem] lg:mx-0 lg:w-[500px] lg:pl-[100px] xl:w-[600px]  2xl:flex 2xl:w-[800px] 2xl:justify-center 2xl:pl-[200px] 2xl:pt-[8rem]"
        >
          <SlideAnimationWrapper
            direction="down"
            className="w-full text-left  text-[32px]  text-white md:text-[40px]"
          >
            <span className=" flex flex-col justify-start xl:flex-row xl:gap-4">
              <h1 className="text-[32px] font-[800] md:text-[40px]">
                Discover
              </h1>
              <span
                className={`${styles.readyToHireText} text-strokeWhite items-center text-[32px]  md:text-[40px]`}
              >
                Ready-To-Hire{" "}
              </span>
            </span>
            <span>
              <h1 className="text-[32px] font-[800] md:text-[40px]">
                Candidates with in minutes
              </h1>
              <h1 className="text-[32px] font-[800] md:text-[40px]">
                not months.
              </h1>
            </span>
          </SlideAnimationWrapper>

          <p className="mt-[32px]  text-[#F7F7F7] md:mt-[12px] ">
            Change the way you hire people: Transform a 30-day cycle into less
            than 5 days per hire. Say goodbye to lost time and hello to a
            streamlined, effective hiring process that gets you the best than
            ever.
          </p>

          <Link href="/recruiter-page">
            <Button
              size="lg"
              className="mt-[39px] flex  w-[206px] gap-[10px] place-self-start rounded-[4px] border border-[#E1E1E1] bg-white hover:bg-white "
            >
              <span className="text-[18px] font-[700] text-black">
                Learn more
              </span>
              <Image
                src={rightArrow}
                width={24}
                height={24}
                alt="arrow"
                className=""
              />
            </Button>
          </Link>
        </SlideAnimationWrapper>

        <div
          className={` grid w-full  place-items-end pl-[1.5rem] sm:w-full sm:pl-[4rem] lg:hidden `}
        >
          <div>
            <SlideAnimation
              direction="down"
              src={section2Item1}
              alt="banner "
              width={700}
              height={650}
              className={` `}
            />
          </div>
        </div>
      </div>

      <div className={`hidden  w-full place-items-end lg:grid  `}>
        <SlideAnimation
          direction="down"
          src={section2Item1}
          alt="banner item"
          width={796}
          height={650}
          className="xl:w-[45vw]  xl:pt-[5vw]"
        />
      </div>
    </div>
  );
};

export default ReadyToHire;

// ${styles.floatingImage}

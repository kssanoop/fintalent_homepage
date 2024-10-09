import image1 from "@/public/section6Img1.svg";

import Link from "next/link";

import SlideAnimation from "../framer-motion-animations/SlideAnimation";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";
import newimg3 from "@/public/aboutusSVGs/fintalentway1.svg";

const LastSection = () => {
  return (
    <div className="container mt-[70px] ">
      <SlideAnimationWrapper direction="down" className="flex flex-col">
        <h3 className="text-center text-[16px] font-[400] lg:text-[20px]">
          Forget the usual way
        </h3>

        <span className=" justify-center gap-4 text-center text-[32px] font-[800] lg:flex lg:text-[36px]">
          <h1>A Fresh </h1>
          <h1
            style={{ letterSpacing: "2px" }}
            className={` text-gradient text-strokeWithGradient `}
          >
            Approach
          </h1>
          <h1 className="animate-charcter ">to Hiring</h1>
        </span>
      </SlideAnimationWrapper>

      {/* flex-col */}
      <div className=" mt-[34px] flex w-full flex-col items-center justify-center gap-[17px] px-[20px] lg:hidden ">
        <Link href="#">
          <SlideAnimation
            direction="down"
            src={image1}
            alt="image1"
            width={350}
            height={320}
            className="w-full"
          />
        </Link>

        <Link href="#">
          <SlideAnimation
            direction="down"
            src={newimg3}
            alt="image1"
            width={350}
            height={320}
            className="w-full"
          />
        </Link>
      </div>

      {/* flex-row */}
      <div className=" mt-[34px] hidden w-full items-center justify-center gap-[24px] px-[20px] lg:flex">
        <Link href="#">
          <SlideAnimation
            direction="left"
            src={image1}
            alt="image1"
            width={550}
            // height={320}
            className=""
          />
        </Link>

        <Link href="#">
          <SlideAnimation
            direction="right"
            src={newimg3}
            alt="image1"
            width={550}
            // height={320}
            className=""
          />
        </Link>
      </div>
    </div>
  );
};

export default LastSection;

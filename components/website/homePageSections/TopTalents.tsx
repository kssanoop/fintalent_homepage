import StyledButton from "../buttonStyles/StyledButton";

import SlideAnimation from "../framer-motion-animations/SlideAnimation";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";
import newImg1 from "@/public/aboutusSVGs/hiretoptalent2.png";
import Link from "next/link";

const TopTalents = () => {
  return (
    <div
      style={{ background: "rgba(3, 74, 154, 0.12)" }}
      className=" flex  flex-col gap-[40px] pt-[80px] lg:flex-row-reverse"
    >
      <SlideAnimationWrapper direction="down">
        <div className="container  mx-auto w-full lg:w-[50vw]  xl:mt-[10px] ">
          <h1 className="text-[32px] font-[800] md:text-[40px] lg:pr-[12vw] xl:pl-[5vw]">
            Recruit the best: elevate your team with top talents
          </h1>
          <p className="mb-[62px] mt-[12px] text-[16px] font-[400] xl:pl-[5vw] xl:pr-[9vw] ">
            Elevate your team with top talent! Find and recruit the best
            candidates effortlessly. Streamline your hiring process and build a
            winning team today
          </p>
          <Link href="/contact-us" className="xl:pl-[5vw]">
            <StyledButton>Contact Us</StyledButton>
          </Link>
        </div>
      </SlideAnimationWrapper>

      <SlideAnimation
        direction="down"
        src={newImg1}
        alt="image"
        height={600}
        width={1040}
        className="mt-[40px]  w-[90vw]  lg:mt-0 lg:w-[50vw]"
      />
    </div>
  );
};

export default TopTalents;

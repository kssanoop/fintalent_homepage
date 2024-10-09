import Image from "next/image";
import introImg from "@/public/aboutusSVGs/introImg(1).svg";
import { Slide } from "react-awesome-reveal";
import SlideAnimation from "../framer-motion-animations/SlideAnimation";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const IntroSection = () => {
  return (
    <div className="mb-[58px] mt-[60px] flex flex-col gap-[24px] lg:flex-row lg:gap-[40px]">
      <div className="w-full px-[8vw] lg:pr-[3vw]">
        <SlideAnimationWrapper direction="left">
          <h1 className="text-[24px] font-[800] md:text-[36px]">
            Bridging the Gap Between Your Company's needs and skilled Talented
            Professionals.
          </h1>
        </SlideAnimationWrapper>
        <SlideAnimationWrapper direction="down">
          <div
            className="mt-[32px] text-[18px] font-[400] text-[#5E5E5E]"
            style={{ letterSpacing: "-0.36px" }}
          >
            <p>
              Are you tired of spending countless hours searching for the
              perfect candidates for your finance and accounting team? Look no
              further than fintalent.
            </p>
            <p className="mt-[30px]">
              We provide top-notch training to ensure our candidates are
              equipped with the skills needed to excel in their field. With
              fintalent, you can Say goodbye to sifting through endless resumes
              and hello to a team of experts that will take your business to the
              next level.
            </p>
          </div>
        </SlideAnimationWrapper>
      </div>

      <SlideAnimationWrapper
        direction="down"
        className="flex w-full items-center justify-end "
      >
        <Image
          src={introImg}
          alt="intro image"
          height={325}
          width={365}
          className="w-[90vw] lg:w-[50vw]"
        />
      </SlideAnimationWrapper>
    </div>
  );
};

export default IntroSection;

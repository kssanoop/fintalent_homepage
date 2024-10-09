import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import smimg1 from "@/public/aboutusSVGs/recruiter1.svg";
import smimg2 from "@/public/aboutusSVGs/recruitersm2.svg";
import smimg3 from "@/public/aboutusSVGs/recruitersm3.png";
import smimg4 from "@/public/aboutusSVGs/recruitersm4.svg";
import smimg5 from "@/public/aboutusSVGs/recruitersm5.svg";

import lgimg1 from "@/public/aboutusSVGs/recruiterlg1.svg";
import lgimg2 from "@/public/aboutusSVGs/recruiterlg2.svg";
import lgimg3 from "@/public/aboutusSVGs/recruiterlg3.svg";
import lgimg4 from "@/public/aboutusSVGs/recruiterlg4.svg";
import lgimg5 from "@/public/aboutusSVGs/recruiterlg5.svg";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const GridCard = () => {
  return (
    <div className="bg-[#3790E31A] pb-[32px] pt-[39px]">
      <SlideAnimationWrapper direction="down">
        {/* <h6 className="text-center font-medium">
          {" "}
          Helping <span className="font-extrabold ">
            {" "}
            1000+ companies{" "}
          </span>{" "}
          hire skilled accountants.{" "}
        </h6> */}
        <h1 className="text-center text-[32px] font-extrabold leading-[38.73px] tracking-tighter md:text-[36px] md:leading-[49.18px]">
          {" "}
          Everything you need at
          <span className="text-[#B21450]"> one place </span>
        </h1>
      </SlideAnimationWrapper>

      {/* cards sm-screen */}
      <div className="mb-[30px] mt-[32px] flex flex-col items-center justify-center gap-[20px] px-[20px] lg:hidden">
        <SlideAnimationWrapper
          direction="down"
          className="h-[445px] min-w-[300px] max-w-[349px] rounded-[12px] bg-white px-[22px] pt-[24px]  "
        >
          <h2 className="text-[20px] font-[800] text-[#171717] ">
            Direct Chat and Instant Response
          </h2>
          <p className="mb-[32px] mt-[8px] text-[16px] font-[500] text-[#5E5E5E]">
            Chat and engage with candidates within the platform.
          </p>
          <Image src={smimg1} width={306} alt="grid image" className="h-[]" />
        </SlideAnimationWrapper>

        <SlideAnimationWrapper
          direction="down"
          className="h-[445px] min-w-[300px] max-w-[349px] rounded-[12px] bg-white  pt-[24px]  "
        >
          <h2 className="px-[22px] text-[20px] font-[800] text-[#171717] ">
            Conduct Video Interview
          </h2>
          <p className="mb-[32px] mt-[8px] px-[22px] text-[16px] font-[500] text-[#5E5E5E]">
            You can schedule the interview directly with the candidates.
          </p>
          <Image
            src={smimg2}
            width={360}
            alt="grid image"
            className="h-[304px] rounded-[12px]"
          />
        </SlideAnimationWrapper>

        <SlideAnimationWrapper
          direction="down"
          className="h-[445px] min-w-[300px] max-w-[349px] rounded-[12px] bg-white pt-[24px]  "
        >
          <h2 className="px-[22px] text-[20px] font-[800] text-[#171717] ">
            Resume Score Checker
          </h2>
          <p className="mb-[32px] mt-[8px] px-[22px] text-[16px] font-[500] text-[#5E5E5E]">
            Frustrated with low quality resumes? Fintalent help you identify the
            right candidate with the scores assigned by the team based on the
            skill sets of the candidates.
          </p>
          <Image
            src={smimg3}
            width={350}
            alt="grid image"
            className="h-[230px] w-full rounded-[12px]"
          />
        </SlideAnimationWrapper>

        <SlideAnimationWrapper
          direction="down"
          className="h-[445px] min-w-[300px] max-w-[349px] rounded-[12px] bg-white pt-[24px]  "
        >
          <h2 className="px-[22px] text-[20px] font-[800] text-[#171717] ">
            Relevant Candidates
          </h2>
          <p className="mb-[32px] mt-[8px] px-[22px] text-[16px] font-[500] text-[#5E5E5E]">
            Quality Grader has analyzed millions of resumes and understands the
            list of top companies or colleges that indicate higher talent
            quality. Find candidates who didn't go to top colleges or companies
            but have strong indicators of quality on their profile.
          </p>
          <Image
            src={smimg4}
            width={350}
            alt="grid image"
            className="h-[184px] rounded-[12px]"
          />
        </SlideAnimationWrapper>

        <SlideAnimationWrapper
          direction="down"
          className="h-[583px] min-w-[300px] max-w-[349px] rounded-[12px] bg-white pt-[24px]  "
        >
          <h2 className="px-[22px] text-[20px] font-[800] text-[#171717] ">
            Hire Confidently with Trust Score
          </h2>
          <p className="mb-[32px] mt-[8px] px-[22px] text-[16px] font-[500] text-[#5E5E5E]">
            Feel anxious every time a candidate is about to join? With Trust
            Score on fintalent make offers to the candidates who are 3x more
            likely to join after they accept your offers. Like CIBIL score
            reflects how creditworthy someone is, Trust Score indicates how
            trustworthy a candidate is.
          </p>
          <Image
            src={smimg5}
            width={350}
            alt="grid image"
            className="h-[267px] rounded-[12px]"
          />
        </SlideAnimationWrapper>
      </div>

      {/* cards lg-screen */}
      <div className="my-[40px] hidden flex-col items-center gap-[18px] lg:flex ">
        <div className="flex gap-[18px] ">
          <SlideAnimationWrapper
            direction="left"
            className="h-[436px] w-[250px] rounded-[12px] bg-white pt-[24px]  xl:w-[286px]  "
          >
            <h2 className="px-[32px] text-[20px] font-[800] text-[#171717] ">
              Direct Chat and Instant Response
            </h2>
            <p className="mb-[20px] mt-[8px] px-[32px] text-[16px] font-[500] text-[#5E5E5E]">
              Chat and engage with candidates within the platform.
            </p>
            <Image
              src={lgimg1}
              width={300}
              alt="grid image"
              className="mr-0 h-[250px] w-full"
            />
          </SlideAnimationWrapper>

          <SlideAnimationWrapper
            direction="down"
            className="h-[436px] w-[370px] rounded-[12px] bg-white pt-[24px]  xl:w-[591px]  "
          >
            <h2 className="px-[32px] text-[20px] font-[800] text-[#171717] ">
              Conduct Video Interview
            </h2>
            <p className="mb-[20px] mt-[8px] max-w-[400px] px-[32px] text-[16px] font-[500] text-[#5E5E5E]">
              You can schedule the interview directly with the candidates.
            </p>
            <Image
              src={lgimg3}
              width={400}
              alt="grid image"
              className="mr-0 h-[305px] w-full"
            />
          </SlideAnimationWrapper>

          <SlideAnimationWrapper
            direction="right"
            className="h-[436px] w-[250px] rounded-[12px] bg-white pt-[24px]  xl:w-[286px]  "
          >
            <h2 className="px-[32px] text-[20px] font-[800] text-[#171717] ">
              Resume Score Checker
            </h2>
            <p className="mb-[20px] mt-[8px] px-[32px] text-[16px] font-[500] text-[#5E5E5E]">
              Frustrated with low quality resumes? Fintalent help you identify
              the right candidate with the scores assigned by the team based on
              the skill sets of the candidates.
            </p>
            <Image
              src={lgimg2}
              width={300}
              alt="grid image"
              className="mr-0 h-[186px] w-full "
            />
          </SlideAnimationWrapper>
        </div>

        <div className="flex gap-[18px]">
          <SlideAnimationWrapper
            direction="down"
            className="h-[400px] w-[440px] rounded-[12px] bg-white pt-[24px]  xl:w-[591px]  "
          >
            <h2 className="px-[32px] text-[20px] font-[800] text-[#171717] ">
              Relevant Candidates
            </h2>
            <p className="mb-[20px] mt-[8px] px-[32px] text-[16px] font-[500] text-[#5E5E5E]">
              Quality Grader has analyzed millions of resumes and understands
              the list of top companies or colleges that indicate higher talent
              quality. Find candidates who didn't go to top colleges or
              companies but have strong indicators of quality on their profile.
            </p>
            <Image
              src={lgimg4}
              width={400}
              alt="grid image"
              className="mr-0 h-[175px] w-full xl:h-[221px]"
            />
          </SlideAnimationWrapper>

          <SlideAnimationWrapper
            direction="down"
            className="h-[400px] w-[440px] rounded-[12px] bg-white pt-[24px]  xl:w-[591px]  "
          >
            <h2 className="px-[32px] text-[20px] font-[800] text-[#171717] ">
              Hire Confidently with Trust Score
            </h2>
            <p className="mb-[20px] mt-[8px] px-[32px] text-[16px] font-[500] text-[#5E5E5E]">
              Feel anxious every time a candidate is about to join? With Trust
              Score on fintalent make offers to the candidates who are 3x more
              likely to join after they accept your offers. Like CIBIL score
              reflects how creditworthy someone is, Trust Score indicates how
              trustworthy a candidate is.
            </p>
            <Image
              src={lgimg5}
              width={700}
              alt="grid image"
              className="h-[175px] overflow-hidden xl:h-[200px]"
            />
          </SlideAnimationWrapper>
        </div>
      </div>

      <SlideAnimationWrapper
        direction="down"
        className="flex flex-col items-center justify-center"
      >
        <h1 className="mb-4 text-center text-2xl font-medium  text-[#5E5E5E] ">
          {" "}
          We will <i className="text-gradient"> boost </i> your hiring rates{" "}
          <br /> like never before.
        </h1>
        <Link href="recruiter/signup">
          <Button variant={"gradient"} size={"lg"} className=" mx-auto  flex">
            {" "}
            Start Hiring {" "}
          </Button>
        </Link>
      </SlideAnimationWrapper>
    </div>
  );
};

export default GridCard;

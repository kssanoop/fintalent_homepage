import React from "react"

import LogoSlider from "../LogoSlider/LogoSlider"

import bannerimg from "@/public/candidate/candidate_hero3(1).png"

import SlideAnimation from "../framer-motion-animations/SlideAnimation"
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper"
import Link from "next/link"

const HeroSection = () => {
  return (
    <div className="mt-[80px]  w-full md:gap-[40px] lg:flex lg:pl-[5vw]">
      <SlideAnimationWrapper
        direction="down"
        className="mx-auto  w-full items-center px-[5vw] md:w-[65vw] lg:w-[50vw] "
      >
        <h1
          className=" text-center  text-[36px]  font-[800] md:text-start"
          style={{ letterSpacing: "-0.72px" }}
        >
          Unleash Your Potential: Get noticed for who you are.
        </h1>
        <p className="mb-[34px] mt-[24px] text-center text-[18px] font-[400] text-[#5E5E5E] md:text-start">
          Join our exclusive community: recruiters engage candidates based on
          profile scores.
        </p>
        <div className="mx-auto flex w-full max-w-[500px] gap-[12px] text-[18px] md:mx-0">
          <Link
            href="https://www.candidate.fintalent.in/signup"
            className="w-full"
          >
            <button className="gradient-button w-full rounded-[5px] px-[10px] py-[12px] text-[18px] font-[700]  text-white">
              Sign Up
            </button>
          </Link>
          <Link
            href="https://www.candidate.fintalent.in/login"
            className="w-full"
          >
            <button className=" w-full rounded-[5px] bg-gray-200 px-[10px] py-[12px] text-[18px] font-[700]  text-black">
              Login
            </button>
          </Link>
        </div>
        <div className="mt-[80px] items-center  text-center lg:w-[40vw] lg:text-start">
          <h2
            style={{ letterSpacing: "1.68px" }}
            className="text-[14px] font-[400]"
          >
            OUR TALENT WORKS WITH
          </h2>
          <LogoSlider />
        </div>
      </SlideAnimationWrapper>

      <div className="hidden lg:flex">
        <SlideAnimation
          direction="right"
          src={bannerimg}
          alt="banner image"
          width={576}
          height={511}
        />
      </div>
    </div>
  )
}

export default HeroSection

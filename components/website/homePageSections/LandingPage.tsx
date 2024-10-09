import React, { useState } from "react"
import LogoSlider from "../LogoSlider/LogoSlider"
import styles from "./Section1.module.css"
import leftImg from "@/public/leftimage1.svg"
import rightImg from "@/public/rightimage1.svg"
import test1hover from "@/public/aboutusSVGs/test1.png"
import test1 from "@/public/aboutusSVGs/test1nohover.png"
import test2 from "@/public/aboutusSVGs/test2.png"
import test2hover from "@/public/aboutusSVGs/test2hover.png"
import close2 from "@/public/aboutusSVGs/Close.png"
import Link from "next/link"
import "animate.css"
import SlideAnimation from "../framer-motion-animations/SlideAnimation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Section1 = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  const handleSignup = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleCardHover = (cardId: any) => {
    setHoveredCard(cardId)
  }

  return (
    <div className=" mb-[50px] mt-[102px] flex flex-col items-center gap-[89px] md:mt-0">
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative rounded-[13.2px] bg-white px-[43px] pb-[46px] pt-[30px] shadow-lg sm:w-[500px]">
            <button
              className="absolute right-4 top-[32px] p-2 text-black hover:text-red-500"
              onClick={handleClosePopup}
            >
              <Image src={close2} alt="close " width={28} height={28} />
            </button>

            <h2
              className="mb-[33px] text-center text-[26.5px] font-[700]"
              style={{
                lineHeight: "35.85px",
                letterSpacing: "-0.04em",
              }}
            >
              Sign up as
            </h2>
            <div className=" flex flex-col gap-[32px] sm:flex-row">
              <Link
                href="/"
                className="gradient-border recruiter flex h-[190px] w-[190px]   items-center justify-center shadow-xl"
              >
                <Image
                  src={hoveredCard === "recruiter" ? test1hover : test1}
                  alt="recruiter sign up"
                  width={98}
                />
              </Link>

              <Link
                href="https://www.candidate.fintalent.in/signup"
                className="gradient-border candidate flex h-[190px] w-[190px] cursor-pointer items-center justify-center rounded-[19px] shadow-xl hover:shadow-2xl"
                onMouseEnter={() => handleCardHover("candidate")}
                onMouseLeave={() => handleCardHover(null)}
              >
                <Image
                  src={hoveredCard === "candidate" ? test2hover : test2}
                  alt="candidate sign up"
                  width={98}
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-around lg:w-[90vw] 2xl:gap-[4rem]">
        {/* animate__animated animate__fadeInLeft */}
        <div className="hidden lg:flex    ">
          <SlideAnimation
            src={leftImg}
            alt="Alt text"
            direction="left"
            width={480}
            height={300}
          />
        </div>

        {/* animate__animated animate__fadeInUp */}
        <div className=" animate__animated animate__fadeInUp  container flex  w-[95vw] flex-col items-center sm:w-[80vw]  lg:w-[525px] 2xl:w-[700px]">
          <div className="w-[80vw] text-center text-[40px] font-[800] sm:text-[48px] md:text-[64px]  ">
            <h1
              style={{ textShadow: "0px 4px 11.2px rgba(0, 0, 0, 0.19)" }}
              className="text-stroke text-[#2E2E2E]"
            >
              Hire
            </h1>

            {/* animated center flexbox text */}
            <div className={` ${styles.scroller} mx-auto flex justify-center`}>
              <span className="text-gradient-normal text-strokeWithGradient">
                Skilled
                <br />
                Trained
                <br />
                Experienced
                <br />
                Technology Driven
              </span>
            </div>
            <h1
              style={{ textShadow: "0px 4px 11.2px rgba(0, 0, 0, 0.19)" }}
              className="text-stroke text-[#2E2E2E]"
            >
              Accountants
            </h1>
          </div>
          <p className="mb-[46px] mt-[18px] text-balance text-center text-[20px] font-[400] text-[#5E5E5E]">
            We help companies grow by connecting them with top-tier finance &
            accounting professionals who possess both real-world work experience
            and the qualifications.
          </p>
          <div
            // href="/recruiter/signup"
            className="text-[18px] font-[700] text-white  "
          >
            {/* Sign up */}
            <Button
              onClick={handleSignup}
              variant="gradient"
              size="sm"
              className="text-md h-[59px] px-8 text-[18px] font-bold shadow-submit-btn"
            >
              Sign Up
            </Button>
          </div>
          {/* <StyledButton onClick={() => console.log('clicked button 2')}>Request a Demo</StyledButton> */}
        </div>

        {/* animate__animated animate__fadeInRight */}
        <div className="hidden lg:flex   ">
          <SlideAnimation
            src={rightImg}
            alt="Alt text"
            direction="right"
            width={480}
            height={300}
          />
        </div>
      </div>

      <div className="mt-[40px] w-full items-center text-center lg:mt-0 lg:w-[70vw]">
        <h2
          className="text-[14px] font-[400]"
          style={{ letterSpacing: "1.68px" }}
        >
          OUR TALENT WORKS WITH
        </h2>
        <LogoSlider />
      </div>
    </div>
  )
}

export default Section1

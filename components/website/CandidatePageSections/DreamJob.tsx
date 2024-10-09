import React from "react";
import dreamImg1 from "@/public/aboutusSVGs/dream1.svg";
import dreamImg2 from "@/public/aboutusSVGs/dream2.svg";
import dreamImg3 from "@/public/aboutusSVGs/dream3.svg";
import dreamImg4 from "@/public/aboutusSVGs/dream4.svg";
import dreamImg5 from "@/public/aboutusSVGs/dream5.svg";
import arrowHead from "@/public/aboutusSVGs/arrowhead.svg";
import rightarrow from "@/public/aboutusSVGs/rightarrow.svg";
import leftarrow from "@/public/aboutusSVGs/leftarrow.svg";
import replace3 from "@/public/aboutusSVGs/replaceimg3.svg";
import Image from "next/image";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const DreamJob = () => {
  return (
    <div className="mb-[100px] mt-[60px] w-full px-[5vw]">
      <SlideAnimationWrapper
        direction="down"
        style={{ letterSpacing: "-0.72px" }}
        className="text-stroke-1 mx-auto max-w-[500px] text-center text-[32px] font-[800] md:text-[36px]"
      >
        We've got together to make your{" "}
        <span className="text-gradient text-strokeWithGradient">dream job</span>{" "}
        a reality
      </SlideAnimationWrapper>

      {/* mobile screens */}
      <div className="mt-[82px] flex flex-col items-center lg:hidden ">
        <SlideAnimationWrapper
          direction="down"
          className="max-w-[488px] rounded-[8px]"
          style={{
            border: "1px solid var(--Grey-3, #E1E1E1)",
            boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            className="rounded-t-[8px] px-[24px] pt-[22px]"
            style={{
              background:
                "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
            }}
          >
            <Image src={dreamImg1} width={440} alt="image1" />
          </div>
          <div className="px-[24px] pb-[32px] pt-[25px]">
            <h1 className="text-[20px] font-[800]">1. Create a profile</h1>
            <p className="text-[16px] font-[400] text-[#5E5E5E]">
              Highlight your skills and experience in your portfolio, to get
              ideal profile score.
            </p>
          </div>
        </SlideAnimationWrapper>

        <div className="flex items-center justify-center">
          <Image src={arrowHead} alt="pointer" />
        </div>

        <SlideAnimationWrapper
          direction="down"
          className="max-w-[488px] rounded-[8px]"
          style={{
            border: "1px solid var(--Grey-3, #E1E1E1)",
            boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            className="rounded-t-[8px] px-[24px] pt-[22px]"
            style={{
              background:
                "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
            }}
          >
            <Image src={dreamImg2} width={440} alt="image1" />
          </div>
          <div className="px-[24px] pb-[32px] pt-[25px]">
            <h1 className="text-[20px] font-[800]">2. Get the Job Invite</h1>
            <p className="text-[16px] font-[400] text-[#5E5E5E]">
              Get job invite from the recruiter based on your profile score
            </p>
          </div>
        </SlideAnimationWrapper>

        <div className="flex items-center justify-center">
          <Image src={arrowHead} alt="pointer" />
        </div>

        <SlideAnimationWrapper
          direction="down"
          className="max-w-[488px] rounded-[8px]"
          style={{
            border: "1px solid var(--Grey-3, #E1E1E1)",
            boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            className="rounded-t-[8px] px-[24px] pt-[22px]"
            style={{
              background:
                "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
            }}
          >
            <Image src={dreamImg3} width={440} alt="image1" />
          </div>
          <div className="px-[24px] pb-[32px] pt-[25px]">
            <h1 className="text-[20px] font-[800]">
              3. Schedule the Interview
            </h1>
            <p className="text-[16px] font-[400] text-[#5E5E5E]">
              Show your worth to the client in the interview
            </p>
          </div>
        </SlideAnimationWrapper>

        <div className="flex items-center justify-center">
          <Image src={arrowHead} alt="pointer" />
        </div>

        <SlideAnimationWrapper
          direction="down"
          className="max-w-[488px] rounded-[8px]"
          style={{
            border: "1px solid var(--Grey-3, #E1E1E1)",
            boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            className="rounded-t-[8px] px-[24px] pt-[22px]"
            style={{
              background:
                "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
            }}
          >
            <Image src={dreamImg4} width={440} alt="image1" />
          </div>
          <div className="px-[24px] pb-[32px] pt-[25px]">
            <h1 className="text-[20px] font-[800]">4. Receive Offer Letter</h1>
            <p className="text-[16px] font-[400] text-[#5E5E5E]">
              Get the offer letter from the client
            </p>
          </div>
        </SlideAnimationWrapper>

        <div className="flex items-center justify-center">
          <Image src={arrowHead} alt="pointer" />
        </div>

        <SlideAnimationWrapper
          direction="down"
          className="max-w-[488px] rounded-[8px]"
          style={{
            border: "1px solid var(--Grey-3, #E1E1E1)",
            boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            className="rounded-t-[8px] px-[24px] pt-[22px]"
            style={{
              background:
                "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
            }}
          >
            <Image src={replace3} width={440} alt="image1" />
          </div>
          <div className="px-[24px] pb-[32px] pt-[25px]">
            <h1 className="text-[20px] font-[800]">5. Start Working</h1>
            <p className="text-[16px] font-[400] text-[#5E5E5E]">
              Start your dream career with your dream company
            </p>
          </div>
        </SlideAnimationWrapper>
      </div>

      {/* large screens */}
      <div className=" container  mx-auto mt-[46px] hidden w-full flex-col items-center lg:flex ">
        <div className="flex ">
          <SlideAnimationWrapper
            direction="left"
            className="h-[380px] w-[400px] rounded-[8px] xl:w-[488px]"
            style={{
              border: "1px solid var(--Grey-3, #E1E1E1)",
              boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              className="rounded-t-[8px] px-[24px] pt-[22px]"
              style={{
                background:
                  "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
              }}
            >
              <Image src={dreamImg1} width={440} height={230} alt="image1" />
            </div>
            <div className="px-[24px] pb-[32px] pt-[25px]">
              <h1 className="text-[20px] font-[800]">1. Create a profile</h1>
              <p className="text-[16px] font-[400] text-[#5E5E5E]">
                Highlight your skills and experience in your portfolio, to get
                ideal profile score.
              </p>
            </div>
          </SlideAnimationWrapper>

          <div className="">
            <div className=" pt-[11rem] ">
              <Image src={rightarrow} width={64} height={72} alt="pointer" />
            </div>

            <SlideAnimationWrapper
              direction="right"
              className="ml-[60px] h-[350px] w-[400px] rounded-[8px] xl:w-[488px]"
              style={{
                border: "1px solid var(--Grey-3, #E1E1E1)",
                boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div
                className="rounded-t-[8px] px-[24px] pt-[22px]"
                style={{
                  background:
                    "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
                }}
              >
                <Image src={dreamImg2} width={440} height={230} alt="image1" />
              </div>
              <div className="px-[24px] pb-[32px] pt-[25px]">
                <h1 className="text-[20px] font-[800]">
                  2. Get the Job Invite
                </h1>
                <p className="w-[320px] text-[16px] font-[400] text-[#5E5E5E]">
                  Get job invite from the recruiter based on your profile score
                </p>
              </div>
            </SlideAnimationWrapper>
          </div>
        </div>

        <div className="flex">
          <div className=" ml-[3.3rem] mt-[-17rem] xl:ml-0 xl:mt-[-20rem]">
            <div className=" ml-[21rem] mt-[12rem] xl:ml-[30rem]">
              <Image src={leftarrow} width={64} height={72} alt="pointer" />
            </div>
            <SlideAnimationWrapper
              direction="left"
              className="ml-[-3.3rem] h-[360px] w-[400px] rounded-[8px] xl:ml-2 xl:w-[488px]"
              style={{
                border: "1px solid var(--Grey-3, #E1E1E1)",
                boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div
                className="rounded-t-[8px] px-[24px] pt-[22px]"
                style={{
                  background:
                    "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
                }}
              >
                <Image src={dreamImg3} width={440} alt="image1" />
              </div>
              <div className="px-[24px] pb-[32px] pt-[25px]">
                <h1 className="text-[20px] font-[800]">
                  3. Schedule the Interview
                </h1>
                <p className="text-[16px] font-[400] text-[#5E5E5E]">
                  Show your worth to the client in the interview
                </p>
              </div>
            </SlideAnimationWrapper>
          </div>
          <div className="ml-[-3rem] flex flex-col">
            <div className=" pt-[11rem]">
              <Image src={rightarrow} width={64} height={72} alt="pointer" />
            </div>

            <SlideAnimationWrapper
              direction="right"
              className="ml-[3rem] w-[400px] rounded-[8px] xl:w-[488px]"
              style={{
                border: "1px solid var(--Grey-3, #E1E1E1)",
                boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div
                className="rounded-t-[8px] px-[24px] pt-[22px]"
                style={{
                  background:
                    "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
                }}
              >
                <Image src={dreamImg4} width={440} alt="image1" />
              </div>
              <div className="px-[24px] pb-[32px] pt-[25px]">
                <h1 className="text-[20px] font-[800]">
                  4. Receive Offer Letter
                </h1>
                <p className="text-[16px] font-[400] text-[#5E5E5E]">
                  Get the offer letter from the client
                </p>
              </div>
            </SlideAnimationWrapper>
          </div>
        </div>

        <div className="lg:mr-[29rem] xl:mr-[30rem] ">
          <div className="mt-[-9rem]  lg:ml-[28rem] xl:ml-[30rem] ">
            <Image src={leftarrow} width={64} height={72} alt="pointer" />
          </div>

          <SlideAnimationWrapper
            direction="left"
            className="ml-[4rem] w-[400px] rounded-[8px] lg:mr-[3.2rem] xl:ml-0 xl:w-[488px]"
            style={{
              border: "1px solid var(--Grey-3, #E1E1E1)",
              boxShadow: "0px 20px 32px 0px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              className="rounded-t-[8px] px-[24px] pt-[22px]"
              style={{
                background:
                  "linear-gradient(94deg, #022A5A 7.71%, #741C54 80.92%)",
              }}
            >
              <Image src={replace3} width={440} alt="image1" />
            </div>
            <div className="px-[24px] pb-[32px] pt-[25px]">
              <h1 className="text-[20px] font-[800]">5. Start Working</h1>
              <p className="text-[16px] font-[400] text-[#5E5E5E]">
                Start your dream career with your dream company
              </p>
            </div>
          </SlideAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;

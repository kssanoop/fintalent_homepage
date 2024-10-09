import Image from "next/image";
import Tick from "@/public/aboutusSVGs/tick4.svg";

import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const PinkBanner = () => {
  return (
    <div className="flex flex-col items-center gap-[16px] md:gap-[18px]">
      <h1 className="text-center text-[14px] font-[400]">
        TRUST US, YOUR BOTTOM LINE WILL THANK YOU.
      </h1>

      <SlideAnimationWrapper direction="down">
        <div
          className="flex w-full items-center justify-center  px-[7vw] py-[12vw] lg:h-[25vh] lg:w-[85vw] lg:rounded-[12px] lg:py-[5vh]"
          style={{
            background: "rgba(178, 20, 80, 0.12)",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-[34px] lg:flex-row lg:gap-[2vw] xl:gap-[5vw]">
            <div className="flex max-w-[360px] items-center gap-[12px]">
              <div
                className="flex w-[54px] items-center justify-center"
                style={{
                  width: "49px",
                  height: "29px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(94deg, #C3D0DD 7.71%, #BEABC1 80.92%)",
                  boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
                }}
              >
                <Image
                  src={Tick}
                  width={18}
                  height={18}
                  alt="tick"
                  className="f items-center"
                />
              </div>
              <div>
                <span className="text-[18px] font-[800]">
                  Save up to 70% &nbsp;
                </span>
                <span className="text-[18px] font-[400] text-[#5E5E5E]">
                  on hiring costs while also reducing bench time.
                </span>
              </div>
            </div>

            <div className="flex max-w-[360px] items-center gap-[12px]">
              <div
                className="flex w-[54px] items-center justify-center"
                style={{
                  width: "49px",
                  height: "29px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(94deg, #C3D0DD 7.71%, #BEABC1 80.92%)",
                  boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
                }}
              >
                <Image
                  src={Tick}
                  width={18}
                  height={18}
                  alt="tick"
                  className="f items-center"
                />
              </div>
              <div>
                <span className="text-[18px] font-[400] text-[#5E5E5E]">
                  Professionals with certifications &nbsp;
                </span>
                <span className="text-[18px] font-[800]">
                  CMA, ACCA, C A, CPA, and EA.
                </span>
              </div>
            </div>

            <div className="flex max-w-[360px] items-center gap-[12px]">
              <div
                className="flex w-[54px] items-center justify-center"
                style={{
                  width: "49px",
                  height: "29px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(94deg, #C3D0DD 7.71%, #BEABC1 80.92%)",
                  boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
                }}
              >
                <Image
                  src={Tick}
                  width={18}
                  height={18}
                  alt="tick"
                  className="f items-center"
                />
              </div>
              <div>
                <span className="text-[18px] font-[400] text-[#5E5E5E]">
                  Build your team in <b className="text-black"> minutes </b>
                  not <b className="text-black"> months </b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </SlideAnimationWrapper>
    </div>
  );
};

export default PinkBanner;

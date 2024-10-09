"use client";

import Image from "next/image";
import React, { useState } from "react";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

import tick1 from "@/public/aboutusSVGs/tick4.svg";

type imageUrl = {
  src: string;
};

type Card1Props = {
  imageUrl: imageUrl;
  title: string;
  description: string;
  tb1?: string;
  tb2: string;
  tb3: string;
  tl1?: string;
  tl2: string;
  tl3: string;
};

const Card1 = ({
  imageUrl,
  title,
  description,
  tb1,
  tb2,
  tb3,
  tl1,
  tl2,
  tl3,
}: Card1Props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <SlideAnimationWrapper
      direction="down"
      className={`  container mt-[20px] flex h-[611px]  min-h-[489px] min-w-[280px] max-w-[383px] flex-col gap-[8px] rounded-[12px] px-[24px] py-[30px] shadow-xl hover:shadow-2xl lg:mx-0`}
    >
      <div
        className="group relative overflow-hidden"
        style={{
          background: isHovered ? "rgba(178, 20, 80, 0.08)" : " #EFEFEF",
          transition: "background 0.5s ease",
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <Image
          src={imageUrl.src}
          width={335}
          height={250}
          alt="card image"
          className=" transform transition-transform group-hover:scale-110"
        />
      </div>
      {/* <div className='fle flex-col gap-[40px]'> */}
      <span className="mt-[18px] flex flex-col gap-[8px]">
        <h1 className="text-[16px] font-[800] md:text-[20px]"> {title}</h1>
        <p className="mb-[40px] mt-[10px] text-[16px] font-[600] text-[#5E5E5E]">
          {description}
        </p>
      </span>

      <span
        style={{
          transition: "background 0.5s ease",
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className={`flex flex-col gap-[18px] font-[400] text-[#5E5E5E] ${
          isHovered ? "font-[600] text-black" : ""
        } `}
      >
        <div className="flex text-[16px]    ">
          <div
            style={{
              background: isHovered
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(0, 0, 0, 0.12)",
              width: "27px",
              height: "27px",
              borderRadius: "50%",
              boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
            }}
            className="flex w-[34px] items-center justify-center "
          >
            <Image
              src={tick1}
              width={18}
              height={18}
              alt="tick"
              className="items-center "
              // style={{
              //   // width: "18px",
              //   // height: "18px",
              //   // borderRadius: "50%",
              //   // background:'rgba(0, 0, 0, 0.12)',
              //   // background: isHovered ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.12)',
              //   // boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",

              // }}
            />
          </div>
          <span>
            <span className="pl-2"> {tb1}&nbsp; </span>
            <span className="font-[400px] text-[#5E5E5E]">{tl1}</span>
          </span>
        </div>
        <div className=" flex text-[16px]">
          <div
            className="flex w-[34px] items-center justify-center"
            style={{
              background: isHovered
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(0, 0, 0, 0.12)",
              width: "27px",
              height: "27px",
              borderRadius: "50%",
              boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
            }}
          >
            <Image
              src={tick1}
              width={18}
              height={18}
              alt="tick"
              className="items-center "
            />
          </div>
          <span>
            <span className="pl-2">{tb2}&nbsp; </span>
            <span className="font-[400px] text-[#5E5E5E]">{tl2}</span>
          </span>
        </div>
        <div className="  flex text-[16px]">
          <div
            className="flex w-[34px] items-center justify-center"
            style={{
              background: isHovered
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(0, 0, 0, 0.12)",
              width: "27px",
              height: "27px",
              borderRadius: "50%",
              boxShadow: "0px 2.38px 36.008px 0px rgba(78, 33, 87, 0.34)",
            }}
          >
            <Image
              src={tick1}
              width={18}
              height={18}
              alt="tick"
              className="items-center "
            />
          </div>
          <span>
            <span className="w-full pl-2">{tb3}&nbsp;</span>
            <span className="w-full font-[400px] text-[#5E5E5E]">{tl3}</span>
          </span>
        </div>
      </span>
      {/* </div> */}
    </SlideAnimationWrapper>
  );
};

export default Card1;

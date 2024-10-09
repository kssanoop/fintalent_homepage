import React from "react";
// import logo1 from "@/public/logo1.png";
import l1 from "@/public/sponserLogos/sp1.svg";
import l2 from "@/public/sponserLogos/sp2.svg";
import l3 from "@/public/sponserLogos/sp3.svg";
import l4 from "@/public/sponserLogos/sp4.svg";
import l5 from "@/public/sponserLogos/sp5.svg";
import l6 from "@/public/sponserLogos/sp6.svg";
import l7 from "@/public/sponserLogos/sp7.svg";
import l8 from "@/public/sponserLogos/sp8.svg";
import l9 from "@/public/sponserLogos/sp9.svg";
import l10 from "@/public/sponserLogos/sp10.svg";
import l11 from "@/public/sponserLogos/sp11.svg";
import l12 from "@/public/sponserLogos/sp12.svg";
import l13 from "@/public/sponserLogos/sp13.svg";
import l14 from "@/public/sponserLogos/sp14.svg";
import l15 from "@/public/sponserLogos/sp15.svg";
import l16 from "@/public/sponserLogos/sp16.svg";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const LogoSlider = () => {
  return (
    <div className="  mx-auto items-center">
      <Marquee autoFill={true} pauseOnHover={true}>
        <div className=" my-[19px] flex h-[49px] items-center justify-center gap-[34px]">
          <Image src={l1} alt="Image 1" className="ml-[32px]" />
          <Image src={l2} alt="Image 2" />
          <Image src={l3} alt="Image 3" />
          <Image src={l4} alt="Image 4" />
          <Image src={l5} alt="Image 5" />
          <Image src={l6} alt="Image 6" />
          <Image src={l7} alt="Image 7" />
          <Image src={l8} alt="Image 8" />
          <Image src={l9} alt="Image 9" />
          <Image src={l10} alt="Image 10" />
          <Image src={l11} alt="Image 11" />
          <Image src={l12} alt="Image 12" />
          <Image src={l13} alt="Image 13" />
          <Image src={l14} alt="Image 14" />
          <Image src={l15} alt="Image 15" />
          <Image src={l16} alt="Image 16" />
        </div>
      </Marquee>
    </div>
  );
};

export default LogoSlider;

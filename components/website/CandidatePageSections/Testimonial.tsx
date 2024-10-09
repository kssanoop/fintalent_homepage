import React from "react";
import quotes from "@/public/candidate/quotes.svg";
import Image from "next/image";
const Testimonial = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 py-[62px]">
        <Image src={quotes} className="" alt="quotes" />
        <h1 className="text-[36px] font-extrabold leading-[49.18px] tracking-tighter">
          What our talents say
        </h1>
        <span> </span>
      </div>
    </div>
  );
};

export default Testimonial;

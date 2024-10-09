import { Button } from "@/components/ui/button";
import contact from "@/public/recruiter/contact.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const ContactUsCard = () => {
  return (
    <SlideAnimationWrapper direction="down">
      <div className="mx-5 mt-[63px]  flex flex-wrap justify-between rounded-lg bg-gradient-to-br from-[#022A5A] to-[#741C54] pt-11 text-white md:mx-[120px] md:px-[60px]">
        <div className="flex flex-col gap-2 px-5 md:px-0">
          <h1
            style={{ letterSpacing: "-0.64px" }}
            className="flex flex-col text-[24px] font-extrabold leading-[43.71px] tracking-tighter sm:flex-row md:text-[32px]"
          >
            {" "}
            <span> Get your free demo today! </span>
          </h1>
          <p className="max-w-[465px] text-lg leading-[24.59px] tracking-tighter text-[#FFFFFFB2] ">
            {" "}
            Drop us an email at{" "}
            <a href="mailto:info@fintalent.in"> info@fintalent.in </a> or the
            old fashioned phone calls work too at
            <a href="tel:917012030702"> +91 7012030702 </a>
          </p>
          <Link href="/contact-us" className="mb-[32px]">
            <Button
              variant="white"
              className="mt-4 w-fit px-[56px] py-3 text-[18px] md:mt-8"
            >
              Contact Us
            </Button>
          </Link>
        </div>
        <div>
          <Image
            className="h-[214px] w-[342px] rounded-t-[8px] object-cover object-top"
            src={contact}
            alt="Peoples"
          />
        </div>
      </div>
    </SlideAnimationWrapper>
  );
};

export default ContactUsCard;

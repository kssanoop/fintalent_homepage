import section4Img from "@/public/ladyImg.svg";
import replaceimg1 from "@/public/aboutusSVGs/group103.svg";

import { AiOutlineThunderbolt } from "react-icons/ai";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useRef, useState } from "react";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";
import SlideAnimation from "../framer-motion-animations/SlideAnimation";

const WhyHire = () => {
  const [activeIndex, setActiveIndex] = useState("0");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const accordionItems = [
    {
      trigger: "HR work made easier with minimum TAT in hiring.",
      content:
        "Experience seamless Hiring with our Dedicated Team, Accelerating Time-to-Hire and Boosting Joining Rates",
    },
    {
      trigger: "Reduce Bench & Hiring Costs",
      content:
        "With fintalent, recruiters can rapidly identify certified individuals ready to deploy to clients, reducing bench time and training costs.",
    },
    {
      trigger:
        "Unlock Talent Instantly: Verified Professionals at Your Fingertips",
      content:
        "Our platform covers every aspect of finance and accounting. Each candidate is pre-verified based on their abilities and qualifications for active projects.",
    },
    {
      trigger: "Live work experience",
      content:
        "Candidates on fintalent are seasoned professionals who have improved their abilities and knowledge through a variety of live projects and internships.",
    },
    {
      trigger: "Immediate Joining",
      content:
        "Candidates are quickly deployable, so you can begin with their duties on the same day they are recruited.",
    },
    {
      trigger: "Certification based search",
      content:
        "Find people with credentials such as CMA, ACCA, CPA, CA, IFRS, and EA.",
    },
  ];

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [accordionItems]);

  const handleAccordionClick = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setActiveIndex(index.toString());

    startInterval();
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) =>
        ((parseInt(prevIndex) + 1) % accordionItems.length).toString(),
      );
    }, 7000);
  };

  return (
    <div className="conatiner mb-[134px] mt-[110px]  px-4">
      <SlideAnimationWrapper direction="down">
        {" "}
        <h1 className="mb-[20px] text-center text-[36px] font-[800] ">
          How is fintalent different ?
        </h1>{" "}
      </SlideAnimationWrapper>

      <div className="container flex flex-col items-center justify-around gap-[32px] md:flex-row md:gap-[28px] md:px-[5vw]">
        <div className={`  flex items-center justify-center md:w-1/2`}>
          <SlideAnimation
            direction="down"
            alt="image"
            src={replaceimg1}
            width={600}
            height={366}
            className="lg:w-full "
          />
        </div>

        <SlideAnimationWrapper
          direction="down"
          className=" flex h-full w-[90vw] items-center justify-center md:h-[35rem] md:w-1/2"
        >
          <Accordion
            collapsible
            type="single"
            className="items-center "
            value={activeIndex}
            // onValueChange={setActiveIndex}
            onValueChange={(index) => handleAccordionClick(parseInt(index))}
          >
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`${index.toString()}`}
                className="rounded-[12px] px-8 py-2"
                style={{
                  background:
                    activeIndex === index.toString()
                      ? "rgba(178, 20, 80, 0.12)"
                      : "transparent",
                }}
              >
                <AccordionTrigger
                  className={`text-start font-[500] lg:text-[18px]
                 ${activeIndex === index.toString()
                      ? " font-extrabold text-[#CD5A86]"
                      : ""
                    }`}
                  style={{ textDecoration: "none" }}
                >
                  <div key={index} className="flex gap-4">
                    <span className="flex items-center justify-center">
                      <AiOutlineThunderbolt />
                    </span>

                    {item.trigger}
                  </div>
                </AccordionTrigger>

                <AccordionContent
                  className={`sm:w-[350px] md:w-[300px] lg:w-[400px]  ${activeIndex === index.toString() ? "pl-7 text-gray-500" : ""
                    } `}
                >
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SlideAnimationWrapper>
      </div>
    </div>
  );
};

export default WhyHire;

import * as React from "react";
import test1Img from "@/public/Adithya.svg";
import test2Img from "@/public/Midhun.svg";
import test3Img from "@/public/Nikhil.svg";
import test4Img from "@/public/JenisNJalal.svg";
import test5Img from "@/public/Sibin.svg";

import hypen from "@/public/aboutusSVGs/arrow.svg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";

const data = [
  {
    name: "Aadithya K G",
    position: "ADM Analyst, Deloitte",
    paragraph:
      "Fintalent is the go-to platform for anyone looking to excel in the finance industry. Their personalized approach to matching candidates with employers sets them apart from other recruitment websites. I've found incredible opportunities through Fintalent that I wouldn't have found elsewhere",
    imageUrl: test1Img,
  },
  {
    name: "Midhun M",
    position: "Process Developer, Genpact",
    paragraph:
      "As a job seeker in the finance industry, Fintalent was a game-changer for me. Their platform provided me with exclusive job opportunities and connected me with reputable employers. I landed my dream job thanks to Fintalent.",
    imageUrl: test2Img,
  },
  // {
  //   name: "Jane Smith",
  //   position: "ADM Analyst, Deloitte",
  //   paragraph:
  //     "Lorem ipsum dolor sit amet consectetur. Amet lorem netus sed eget in dictumst. Risus auctor bibendum molestie nec lectus. Fermentum risus sed sollicitudin justo egestas enim sed. Gravida ridiculus malesuada diam sollicitudin pulvinar vitae est morbi.",
  //   imageUrl: test3Img,
  // },
  {
    name: "Nikhil P",
    position: "R2R Associate, Accenture",
    paragraph:
      "Fintalent made the job search process incredibly efficient and stress-free for me. Their platform's advanced algorithms quickly identified job openings that were a perfect fit for my skills and experience. I appreciated the transparency throughout the application process and the ability to track my progress directly through the platform. With Fintalent's help, I secured a position at a reputable financial firm that exceeded my expectations",
    imageUrl: test3Img,
  },
  {
    name: "Jenis N Jalal",
    position: "Senior Officer, Wipro",
    paragraph:
      "I can't thank Fintalent enough for helping me advance my career in the finance industry. Their platform is directly connected with recruiters from MNCs around the world. It helps us to provide exciting job opportunities in various finance domains. I highly recommend Fintalent to any finance professional looking to take the next step in their career.",
    imageUrl: test4Img,
  },
  {
    name: "Sibin Sebastian",
    position: "ADM Analyst, Deloitte",
    paragraph:
      "Job application processes can be so nerve-racking, but having a great recruitment Platform such as Fintalent can make a difference, the whole process has been a breeze. I would especially like to highlight Fintalent’s Profile Scores, it helps us to evaluate and evolve ourselves, leaving no room for confusion. All this being said I would highly recommend Fintalent; the team will truly go the extra mile and ensure that you get the support you need.",
    imageUrl: test5Img,
  },
];

export function CarouselSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <SlideAnimationWrapper
      direction="down"
      className="mt-[2rem] flex w-full  flex-col justify-center "
    >
      <div className="flex items-center justify-center">
        <Image src={hypen} width={23} height={16} alt="hyphen" />
      </div>
      <h1 className="text-stroke-1  mt-[20px] px-[5vw] text-center text-[32px] font-[800] md:text-[36px]">
        What our talents say
      </h1>
      {/* Centered container */}
      <div className=" container mx-auto w-[90vw] items-center md:w-[60vw] lg:w-[50vw]">
        <div className="mb-[30px] flex items-center justify-center text-center">
          <hr className="my-auto w-[100px] items-center " />
          <span className="rounded-[24px] bg-[#E2E2E2] px-[10px] py-[2px] text-[14px] font-[400]">
            {" "}
            {current} / {count}
          </span>
          <hr className="my-auto w-[100px] items-center " />
        </div>
        <Carousel setApi={setApi} className="   md:w-full">
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="border-none">
                  <CardContent className="flex flex-col items-center py-6">
                    <p className="mb-[46px] text-center text-[20px] text-gray-500 ">
                      {item.paragraph}
                    </p>
                    <div className="mb-4 overflow-hidden rounded-full">
                      <Image
                        src={item.imageUrl.src}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <p className="tex-[20px] mt-[12px] font-[800]">
                      {item.name}
                    </p>
                    <p className="text-[16px] font-[500] text-[#5E5E5E]">
                      {item.position}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="lg:ml-[-6rem]" />
          <CarouselNext className="lg:mr-[-6rem]" />
        </Carousel>
      </div>
    </SlideAnimationWrapper>
  );
}

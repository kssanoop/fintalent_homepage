import Image from "next/image";
import service1 from "@/public/services/service1.png";
import service2 from "@/public/services/service2.png";
import service3 from "@/public/services/service3.png";
import service4 from "@/public/services/service4.png";
import servicesImg from "@/public/services/services.svg";
import React from "react";
import SlideAnimation from "@/components/website/framer-motion-animations/SlideAnimation";
import SlideAnimationWrapper from "@/components/website/framer-motion-animations/SlideAnimationWrapper";
import ContactUsCard from "@/components/website/CardComponents/ContactUsCard";

const Services = () => {
  const services = [
    {
      serviceId: 1,
      title: "Recruitment as a Service",
      description:
        "Fintalent revolutionizes your hiring process by simplifying candidate acquisition. Our platform empowers you to effortlessly onboard highly skilled and trained individuals for both entry-level and mid-level positions. Recruiters gain direct access to a meticulously designed algorithm-driven portal, eliminating the need to sift through resumes and traditional job boards",
      imgData: service1,
    },
    {
      serviceId: 2,
      title: "Contractual Employees",
      description: `Address your seasonal or project-based staffing requirements by engaging qualified candidates on a contractual basis. Our
        platform enables you to easily hire individuals who can seamlessly meet your short-term needs and contribute to your projects with their specialized skills`,
      imgData: service2,
    },
    {
      serviceId: 3,
      title: "Corporate Training",
      description: `Our firm acknowledges that skilled personnel are the backbone of any successful company. By offering practical and tailored accounting training,
      we empower both newly hired candidates and current staff to excel in corporate accounting. Let us help you enhance the abilities and deepen the
      understanding of your team, ensuring a strong foundation for your company's growth and prosperity`,
      imgData: service3,
    },
    {
      serviceId: 4,
      title: "Train and Hire Model",
      description: `Unlock the potential of your workforce with our transformative Train and Hire model, creating a pipeline of skilled talent ready to drive your business forward.
      Best suited hiring strategy for mass recruiters.`,
      imgData: service4,
    },
  ];
  return (
    <>
      <h6 className="text-gradient pt-[42px] text-center text-2xl font-extrabold leading-[33px] tracking-tighter">
        Our Services
      </h6>
      <h1 className="px-14 text-center text-[36px] font-extrabold leading-[54.64px] tracking-tighter  md:text-[40px] ">
        Lorem Ipsum Dolor sit amet{" "}
      </h1>{" "}
      <div className="relative mx-2 my-16 ml-16 mr-4 flex flex-col gap-[60px] md:mx-36 md:gap-[220px]">
        <div className="absolute -left-8 top-7 h-[79%] border-[1px] border-dashed border-[#012A5966] md:left-1/2 md:top-40 md:h-[85%]"></div>
        {/* <div className="relative flex flex-row flex-wrap  flex-wrap-reverse items-center justify-center gap-10 md:flex-nowrap md:gap-[120px]">
          <Image
            className="absolute -left-[53px] top-0 w-[40px] rounded-lg md:left-[47.5%] md:top-1/2 md:w-[55px]"
            src={servicesImg}
            alt="Image"
            width={55}
            height={55}
          />
          <SlideAnimation
            direction="left"
            src={service1}
            alt="Image"
            width={518}
            // height={320}
            className="h-full w-full md:w-1/2"
            cardClassName="rounded-lg"
          />
          <SlideAnimationWrapper direction="right" className="w-full md:w-1/2">
            <h1 className="text-[24px] font-extrabold leading-[43.71px] tracking-tighter md:text-[32px]">
              {" "}
              Recruitment as a Service{" "}
            </h1>
            <p className="text-[16px] leading-[30px] tracking-tighter text-[#5E5E5E] md:text-[20px]">
              {" "}
              Fintalent revolutionizes your hiring process by simplifying
              candidate acquisition. Our platform empowers you to effortlessly
              onboard highly skilled and trained individuals for both
              entry-level and mid-level positions. Recruiters gain direct access
              to a meticulously designed algorithm-driven portal, eliminating
              the need to sift through resumes and traditional job boards{" "}
            </p>
          </SlideAnimationWrapper>
        </div>

        <div className="relative flex flex-row flex-wrap  flex-wrap-reverse items-center justify-center gap-10 md:flex-nowrap md:gap-[120px]">
          <Image
            className="absolute -left-[53px] top-0 w-[40px] rounded-lg md:left-[47.5%] md:top-1/2 md:w-[55px]"
            src={servicesImg}
            alt="Image"
            width={55}
            height={55}
          />
          <SlideAnimation
            direction="left"
            src={service1}
            alt="Image"
            width={518}
            // height={320}
            className="h-full w-full md:w-1/2"
            cardClassName="rounded-lg"
          />
          <SlideAnimationWrapper direction="right" className="w-full md:w-1/2">
            <h1 className="text-[24px] font-extrabold leading-[43.71px] tracking-tighter md:text-[32px]">
              {" "}
              Recruitment as a Service{" "}
            </h1>
            <p className="text-[16px] leading-[30px] tracking-tighter text-[#5E5E5E] md:text-[20px]">
              {" "}
              Fintalent revolutionizes your hiring process by simplifying
              candidate acquisition. Our platform empowers you to effortlessly
              onboard highly skilled and trained individuals for both
              entry-level and mid-level positions. Recruiters gain direct access
              to a meticulously designed algorithm-driven portal, eliminating
              the need to sift through resumes and traditional job boards{" "}
            </p>
          </SlideAnimationWrapper>
        </div> */}
        {services?.map((elem, index) => (
          <div
            key={elem?.serviceId}
            className={`relative flex flex-row flex-wrap  flex-wrap-reverse items-center justify-center gap-10 md:flex-nowrap md:gap-[120px] ${
              index % 2 !== 0 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Image
              className="absolute -left-[53px] top-0 w-[40px] rounded-lg md:left-[47.5%] md:top-1/2 md:w-[55px]"
              src={servicesImg}
              alt="Image"
              width={55}
              height={55}
            />
            <SlideAnimation
              direction={index % 2 === 0 ? "left" : "right"}
              src={elem?.imgData}
              alt="Image"
              width={518}
              // height={320}
              className="h-full w-full md:w-1/2"
              cardClassName="rounded-lg"
            />
            <SlideAnimationWrapper
              direction={index % 2 === 0 ? "right" : "left"}
              className="w-full md:w-1/2"
            >
              <h1 className="text-[24px] font-extrabold leading-[43.71px] tracking-tighter md:text-[32px]">
                {elem?.title}
              </h1>
              <p className="text-[16px] leading-[30px] tracking-tighter text-[#5E5E5E] md:text-[20px]">
                {elem?.description}
              </p>
            </SlideAnimationWrapper>
          </div>
        ))}
      </div>
      <ContactUsCard />
    </>
  );
};

export default Services;

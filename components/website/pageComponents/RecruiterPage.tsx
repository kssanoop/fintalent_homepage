import { Button } from "@/components/ui/button";
import Image from "next/image";
import verified from "@/public/recruiter/verified.svg";
import Number1 from "@/public/recruiter/1no.svg";
import Number2 from "@/public/recruiter/2no.svg";
import Number3 from "@/public/recruiter/3no.svg";
import rules1 from "@/public/recruiter/rules1.svg";
import rules2 from "@/public/recruiter/rules2.svg";
import rules3 from "@/public/recruiter/rules3.svg";
import rules4 from "@/public/recruiter/rules4.svg";
import rules5 from "@/public/recruiter/rules5.svg";
import rules6 from "@/public/recruiter/rules6.svg";
import Work1 from "@/public/recruiter/work1.png";
import Work2 from "@/public/recruiter/work2.png";
import Work3 from "@/public/recruiter/work3.png";
import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import ContactUsCard from "@/components/website/CardComponents/ContactUsCard";
import SlideAnimationWrapper from "../framer-motion-animations/SlideAnimationWrapper";
import GridCard from "../RecruiterComponents/GridCard";
import m1 from "@/public/recruiter/m1.svg";
import m2 from "@/public/recruiter/m2.jpg";
import m3 from "@/public/recruiter/m3.svg";
import m4 from "@/public/recruiter/m4.svg";
import m5 from "@/public/recruiter/m5.jpg";
import m6 from "@/public/recruiter/m6.svg";
import m7 from "@/public/recruiter/m7.svg";
// import mdata from "@/public/recruiter/mdata.svg";
import mdata1 from "@/public/recruiter/mdata1.svg";
import mdata2 from "@/public/recruiter/mdata2.svg";
import mdata3 from "@/public/recruiter/mdata3.svg";
import mdata4 from "@/public/recruiter/mdata4.svg";
import mdata5 from "@/public/recruiter/mdata5.svg";
import mdata6 from "@/public/recruiter/mdata6.svg";
import mdata7 from "@/public/recruiter/mdata7.svg";

const Recruiter: React.FC = () => {
  const recruiters = [
    {
      id: 1,
      imgPath: m1,
      name: "Mohd Thwoyyib",
      designation: "R2R Analyst",
      experience: "2 Years Experince",
      btnLink: "#",
      score: "86",
      mdata: mdata1,
    },
    {
      id: 2,
      imgPath: m2,
      name: "Merin Sunny",
      designation: "Finance Associate",
      experience: "0 - 1 Year Experince",
      btnLink: "#",
      score: "84",
      mdata: mdata2,
    },
    {
      id: 3,
      imgPath: m3,
      name: "Saffa Saleem",
      designation: "Accounting",
      experience: "0 - 1 Year Experince",
      btnLink: "#",
      score: "85",
      mdata: mdata3,
    },
    {
      id: 4,
      imgPath: m4,
      name: "Habeeb Rahman",
      designation: "Associate",
      company: "Trinity corp",
      experience: "0 - 1 Year Experince",
      btnLink: "#",
      score: "85",
      mdata: mdata4,
    },
    {
      id: 5,
      imgPath: m5,
      name: "Sneha",
      designation: "Accounting Specialist",
      experience: "2 Years Experince",
      btnLink: "#",
      score: "90",
      mdata: mdata5,
    },
    {
      id: 6,
      imgPath: m6,
      name: "Darsana Jose",
      designation: "Associate - US Accounts",
      experience: "1.5 Year Experince",
      btnLink: "#",
      score: "92",
      mdata: mdata6,
    },
    {
      id: 7,
      imgPath: m7,
      name: "Angel Joemon",
      designation: "Finance Associate",
      company: "Trinity corp",
      experience: "2 Years Experince",
      btnLink: "#",
      score: "90",
      mdata: mdata7,
    },
  ];
  const hiring = [
    {
      stepId: 1,
      stepImgPath: Number1,
      imgPath: Work1,
      title: "Shortlist top Candidates",
      description:
        "Effortlessly pinpoint top candidates with our streamlined selection process. Save time and ensure quality hires with our intuitive platform",
    },
    {
      stepId: 1,
      stepImgPath: Number2,
      imgPath: Work2,
      title: "Conduct Interviews",
      description:
        "Simplify your interview process effortlessly with our intuitive platform. Streamline scheduling, evaluation, and follow-up seamlessly.",
    },
    {
      stepId: 1,
      stepImgPath: Number3,
      imgPath: Work3,
      title: "Hire Instantly",
      description:
        "Find, vet, and onboard top talent in record time. Instantly meet your staffing needs with our efficient hiring platform",
    },
  ];
  const rules = [
    {
      rulesId: 1,
      imgPath: rules1,
      title: "Pre-screened profiles",
      description:
        "Our vetted profiles ensure only qualified finance and accounting professionals are connected with recruiters.",
    },
    {
      rulesId: 2,
      imgPath: rules2,
      title: "Relevant search & filters",
      description:
        "Find the best-fit candidate quickly and easily with predictive search, powerful filters and candidate ratings.",
    },
    {
      rulesId: 3,
      imgPath: rules3,
      title: "Automated Video Interviews",
      description:
        "Get to know your candidates better with automated video and written interviews that uncover strengths, weaknesses and more.",
    },
    {
      rulesId: 4,
      imgPath: rules4,
      title: "Reducing Bench Costs",
      description:
        "Cut down on bench costs by quickly finding the most suitable candidate for each role.",
    },
    {
      rulesId: 5,
      imgPath: rules5,
      title: "Reduced Time to Fill",
      description:
        "With our pre-vetted and ready-to-work candidates, you save the time, money and effort normally spent on searching for the ideal candidate.",
    },
    {
      rulesId: 6,
      imgPath: rules6,
      title: "Speedy Recruitment",
      description:
        "Get the right fit for your team with speedy recruitment. Save time and resources with the most advanced recruitment platform for the finance and accounts professionals.",
    },
  ];
  return (
    <>
      {/* Section 1 */}
      <SlideAnimationWrapper direction="down">
        <div className="flex flex-col items-center justify-center gap-4 px-5 py-[71px] text-center md:px-[220px]">
          <h1 className="text-[36px] font-extrabold tracking-[-0.8px] md:text-[40px]">
            Discover Your Perfect Match:
            <br />
            The Ultimate Talent hunt ends here
          </h1>
          <p>
            Save time by avoiding scrutiny on a pile of resumes. Talk to our top
            performers directly.{" "}
          </p>
          <span className="flex gap-5">
            <Link href="recruiter/signup">
              <Button variant="gradient" size="lg">
                Sign Up
              </Button>
            </Link>
            <Link href="recruiter/login">
              <Button variant="grey" size="lg">
                Login
              </Button>
            </Link>
          </span>
        </div>
      </SlideAnimationWrapper>
      {/* Section 2 */}
      <SlideAnimationWrapper direction="down">
        <Marquee className="" pauseOnHover={true}>
          <Link href="recruiter/login">
            <div className="ml-7 flex cursor-pointer gap-[23px] overflow-auto">
              {recruiters?.map((elem) => (
                <div
                  key={elem?.id}
                  className="mb-4 min-w-[341px] rounded-[8px] bg-white shadow-lg"
                >
                  <Image
                    className="h-[300px] w-[342px] rounded-t-[8px] object-cover object-top"
                    src={elem?.imgPath}
                    alt="Peoples"
                  />
                  <div className="flex flex-col gap-1 py-6">
                    <div className="flex">
                      <div>
                        <p className="flex items-center gap-1 px-6 text-[18px] font-bold">
                          {elem?.name}
                          <Image
                            className="h-[21px] w-[21px] rounded-t-[8px] object-cover object-top"
                            src={verified}
                            alt="Peoples"
                          />
                        </p>
                        <p className="px-6 text-[14px] font-medium leading-[20px] text-[#171717]">
                          {elem?.designation}
                        </p>
                        <p className="mb-[22px] px-6 text-[14px] font-medium leading-[20px] text-[#5E5E5E]">
                          <span
                            className=""
                            style={{
                              color: "var(--Grey-2, #5E5E5E)",
                              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            {/* &nbsp;·&nbsp; &nbsp; */}
                            {elem?.experience}{" "}
                          </span>
                        </p>
                      </div>
                      <div className="h-[70px] rounded-[8px] border-[2px] border-[#EFEFEF] p-[12px]">
                        <p className="text-[12px] font-[600] text-[#171717]">
                          Candidate Score
                        </p>
                        <h3 className="text-[18px] font-[800] text-[#00BA70]">
                          {elem?.score}%
                        </h3>
                      </div>
                    </div>
                    <Image
                      width={320}
                      src={elem?.mdata}
                      alt="stats"
                      className="  ml-5 items-end"
                    />
                    <Button className="mx-6 mt-5"> View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        </Marquee>
      </SlideAnimationWrapper>

      {/* Section 3 */}
      <div className="flex flex-col items-center justify-center gap-1 px-5 py-[60px]">
        <SlideAnimationWrapper direction="down" className="flex flex-col gap-1">
          <h6 className="text-center font-medium">
            {" "}
            Helping <span className="font-extrabold ">
              {" "}
              1000+ companies{" "}
            </span>{" "}
            to hire skilled accountants.{" "}
          </h6>
          <h1 className="text-center text-[32px] font-extrabold tracking-[-0.8px] md:text-[40px]">
            {" "}
            How hiring on{" "}
            <span className="text-gradient-normal"> fintalent </span> works{" "}
          </h1>
        </SlideAnimationWrapper>
        <div className="mt-[50px] flex flex-col justify-center  gap-[73px] md:mt-[60px] md:px-5 lg:flex-row">
          {hiring?.map((elem) => (
            <SlideAnimationWrapper
              direction="down"
              key={elem?.stepId}
              className="relative flex w-full max-w-[349px] flex-col gap-2"
            >
              <Image
                className="absolute -top-[24px] left-[40%] rounded-lg"
                src={elem?.stepImgPath}
                alt="Image"
                width={55}
                height={55}
              />
              <Image
                src={elem?.imgPath}
                alt="People1"
                className="rounded-[8px]"
              />
              <h6 className="pt-2 text-[20px] font-extrabold leading-[-0.4px]">
                {elem?.title}
              </h6>
              <p className="max-w-[350px] font-semibold leading-[-0.32px] text-[#5E5E5E]">
                {elem?.description}
              </p>
            </SlideAnimationWrapper>
          ))}
        </div>
      </div>

      {/* Section 4 */}
      <GridCard />

      {/* Section 5 */}
      <div className="flex w-full flex-col pt-[82px] leading-[49.18px] tracking-tighter">
        <SlideAnimationWrapper direction="down">
          <h1
            style={{ letterSpacing: "-0.64px" }}
            className=" text-stroke-1 px-8 text-center text-[32px] font-extrabold md:text-[36px]"
          >
            {" "}
            Forget the old rules of hiring. <br />
            You can have the
            <span
              style={{ letterSpacing: "-0.64px" }}
              className="text-gradient text-strokeWithGradient"
            >
              &nbsp;best people{" "}
            </span>
            here
          </h1>
        </SlideAnimationWrapper>

        <div className="mx-auto mt-12 flex w-[90vw] flex-wrap justify-center gap-x-5 gap-y-3 lg:w-[80vw]">
          {rules?.map((elem, index) => (
            <SlideAnimationWrapper
              direction="down"
              key={index}
              className="flex w-[32%] min-w-[300px] flex-col gap-2 rounded-lg border-[1px] border-[#E9E9E9] p-5"
            >
              <div className="relative h-[62px] w-[62px] rounded-lg">
                <Image src={elem?.imgPath} fill alt="icons" />
              </div>
              <h6 className="my-[8px] text-xl font-extrabold leading-[27.32px] tracking-tighter">
                {elem?.title}
              </h6>
              <p className="font-medium leading-[21.86px]">
                {elem?.description}
              </p>
            </SlideAnimationWrapper>
          ))}
        </div>
        {/* Section 6 */}
        <ContactUsCard />
      </div>
    </>
  );
};

export default Recruiter;

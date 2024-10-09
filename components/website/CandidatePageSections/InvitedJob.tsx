import React from "react";
import curvearrow from "@/public/candidate/curvearrow.svg";
import Job from "@/public/candidate/Job.svg";
import deloitte from "@/public/candidate/company-logos/deloitte.svg";
import entigrity from "@/public/candidate/company-logos/entigrity.svg";
import ey from "@/public/candidate/company-logos/ey.svg";
import genpact from "@/public/candidate/company-logos/genpact.svg";
import paperchase from "@/public/candidate/company-logos/paperchase.svg";
import Rupees from "@/public/candidate/Rupees.svg";
import Location from "@/public/candidate/Location.svg";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";

const InvitedJob = () => {
  const cards = [
    {
      jobID: 1,
      logo: deloitte,
      position: "Analyst ",
      atCompany: "Deloitte",
      icons: [
        {
          name: "Full Time",
          icon: Job,
        },
        {
          name: "3 - 5 LPA",
          icon: Rupees,
        },
        {
          name: "Hyderabad",
          icon: Location,
        },
      ],
      jobDescription:
        "Looking for an experienced UI Designer for an on going project. It is hoped that you will be able to work with the existing team to work on the project that we are currently developing at our company.",
    },
    {
      jobID: 2,
      logo: ey,
      position: "Tax Associate ",
      atCompany: "EY",
      icons: [
        {
          name: "Full Time",
          icon: Job,
        },
        {
          name: "3 - 4 LPA",
          icon: Rupees,
        },
        {
          name: "Hyderabad",
          icon: Location,
        },
      ],
      jobDescription:
        "You will play a crucial role in supporting the tax department of our organization. Your primary responsibility will be to assist with various tax-related tasks, ensuring compliance with local, state...",
    },
    {
      jobID: 3,
      logo: entigrity,
      position: "US Accountant ",
      atCompany: "Entigrity",
      icons: [
        {
          name: "Full Time",
          icon: Job,
        },
        {
          name: "3 - 4 LPA",
          icon: Rupees,
        },
        {
          name: "Bangalore",
          icon: Location,
        },
      ],
      jobDescription:
        "Looking for a candidate responsible for overseeing financial activities and ensuring compliance with accounting principles and regulations specific to the United States. Your role will encompass a range of accounting...",
    },
    {
      jobID: 4,
      logo: paperchase,
      position: "Senior Analyst ",
      atCompany: "Paperchase",
      icons: [
        {
          name: "Full Time",
          icon: Job,
        },
        {
          name: "3 - 4 LPA",
          icon: Rupees,
        },
        {
          name: "Bangalore",
          icon: Location,
        },
      ],
      jobDescription:
        "You will hold a pivotal role in our organization, providing valuable insights and analysis to drive strategic decision-making and improve operational efficiency. Your responsibilities will encompass a diverse range of analytical tasks across various...",
    },
    {
      jobID: 5,
      logo: genpact,
      position: "Process Developer O2C",
      atCompany: "Genpact",
      icons: [
        {
          name: "Full Time",
          icon: Job,
        },
        {
          name: "3 - 4 LPA",
          icon: Rupees,
        },
        {
          name: "Bangalore",
          icon: Location,
        },
      ],
      jobDescription:
        "As a Process Developer O2C (Order-to-Cash), you will be responsible for managing and optimizing the end-to-end order processing and revenue realization cycle within the organization. Your role involves ensuring efficient and accurate execution of...",
    },
  ];
  return (
    <div
      className={`hide-scrollbar flex h-full flex-wrap items-center gap-12 overflow-auto bg-gradient-to-r from-[#022A5A] to-80% to-[#741C54] py-20 pl-5 md:h-full md:py-10 md:pl-[121px]`}
    >
      <h1 className="relative w-[295px] text-[36px] font-extrabold leading-[49.18px] tracking-tighter text-white ">
        You’re invited for
        <span className="border-b-[5px] pb-2"> 8 new jobs </span>
        <Image
          className="absolute -bottom-12 left-44 h-[78px] w-[167px]"
          src={curvearrow}
          alt="curvearrow"
        />
      </h1>
      <div className="hide-scrollbar flex w-[50%] flex-grow gap-[23px] overflow-auto  pl-2">
        <Marquee autoFill={true} pauseOnHover={true}>
          <div className="flex gap-[23px]">
            {cards?.map((elem, index) => (
              <div
                key={elem?.jobID}
                className={`min-w-[350px] max-w-[350px] rounded-[10px] border-[1px] border-[#E1E1E1] bg-white p-6 md:min-w-[550px] md:max-w-[550px] ${
                  cards.length - 1 === index ? "mr-6" : "mr-0"
                }`}
              >
                <div className="flex gap-4">
                  <Image
                    className="h-[50px] w-[50px] cursor-pointer"
                    src={elem?.logo}
                    alt="Jobs"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base text-[#5E5E5E]">
                      <span className="block font-bold text-black md:inline">
                        {elem?.position}
                      </span>
                      at {elem?.atCompany}
                    </p>
                    <div className="-ml-16 mt-4 flex gap-[19px] md:ml-0 md:mt-0">
                      {elem?.icons?.map((icon, index) => (
                        <span
                          key={index}
                          className="flex items-center justify-center gap-1"
                        >
                          <Image
                            className="h-[19px] w-[19px] cursor-pointer"
                            src={icon?.icon}
                            alt="Jobs"
                          />
                          <p className="text-[14px] font-medium text-[#5E5E5E]">
                            {icon?.name}
                          </p>
                        </span>
                      ))}
                    </div>
                    <p className="-ml-16 text-sm font-medium leading-[24px] text-[#5E5E5E] md:ml-0">
                      {elem?.jobDescription}
                    </p>
                    <div className="mt-3 flex w-full justify-end gap-2">
                      <Button variant="reject"> Decline </Button>
                      <Button variant="success" className="px-5">
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default InvitedJob;

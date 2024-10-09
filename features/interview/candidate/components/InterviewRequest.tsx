import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextButtton from "./NextButton";
import PrevButton from "./PrevButton";
import { useGetInterviewRequests } from "../../api/get-interview-request-candidate";
import { InterviewData } from "../../schema/interview-data-schema";
import InterviewCardSkeletonLoading from "./skeleton-loading/interview-card-skeleton-loading";

interface InterviewRequesProps {
  setInterviewCount: Dispatch<SetStateAction<string>>;
}
const InterviewRequest = ({ setInterviewCount }: InterviewRequesProps) => {
  const [slideToShow, setSlideToShow] = useState(2);
  const [currents, setCurrents] = useState(0);
  const [progress, setProgress] = useState(0);
  const { data, isLoading, isError } = useGetInterviewRequests();
  console.log("Interview Request data:", data);
  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 650) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 767) {
      setSlideToShow(1);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: (
      <NextButtton
        current={currents + 1}
        slideToShow={slideToShow}
        length={data?.length}
        onClick={undefined}
        page={"Interview"}
        isLoading={isLoading}
      />
    ),
    prevArrow: (
      <PrevButton
        current={currents + 1}
        length={data?.length}
        onClick={undefined}
        slideToShow={slideToShow}
        page={"Interview"}
        isLoading={isLoading}
      />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (current: number) => {
      setCurrents(current);
      setProgress((100 / (data?.length - slideToShow + 1)) * (current + 1));
      console.log(slideToShow);
    },
  };

  const handleResize = () => {
    setSlides();
  };

  if (isError) {
    <div>Error</div>;
  }
  if (data) {
    setInterviewCount(data?.length);
  }

  useEffect(() => {
    function UpdateProgress() {
      setProgress((100 / (data?.length - slideToShow + 1)) * (currents + 1));
    }
    setTimeout(UpdateProgress, 500);
  }, [currents, data, slideToShow]);

  return (
    <div className="mt-1 w-full">
      {isLoading ? (
        <>
          <Slider {...settings}>
            {[...Array(2)].map(() => {
              return (
                <InterviewCardSkeletonLoading
                  key={crypto.randomUUID()}
                  section="Request"
                />
              );
            })}
          </Slider>
        </>
      ) : (
        <>
          {data && data?.length >= 2 ? (
            <Slider {...settings}>
              {data?.map((interview: InterviewData) => {
                return (
                  <div
                    className="flex items-start justify-start"
                    key={crypto.randomUUID()}
                  >
                    <InterviewCard section="Request" data={interview} />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <>
              {data?.map((interview: InterviewData) => {
                return (
                  <div
                    className="flex w-full md:w-[50.3%]"
                    key={crypto.randomUUID()}
                  >
                    <InterviewCard
                      section="Request"
                      key={crypto.randomUUID()}
                      data={interview}
                    />
                  </div>
                );
              })}
            </>
          )}
          {/* buttons amd progessbar */}
          {data?.length > 2 && (
            <div className="mt-5 flex md:items-center md:justify-center">
              <div className="h-1 w-[108px] rounded bg-gray-300">
                <div
                  className="h-[100%] rounded bg-blue-800 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InterviewRequest;

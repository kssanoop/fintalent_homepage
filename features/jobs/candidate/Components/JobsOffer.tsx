import React, { useEffect, useState } from "react";
import JobsCard from "./JobsCard";
import Slider from "react-slick";
import NextButtton from "@/features/interview/candidate/components/NextButton";
import PrevButton from "@/features/interview/candidate/components/PrevButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetJobInvitesByCandidate } from "./api/useGetJobsByCandidate";
import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import { useBoundStore } from "@/store/useBoundStore";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
interface JobsOfferProps {
  // setOfferNumber: Dispatch<SetStateAction<number>>;
  updateOfferNumber: (number: number) => void;
}
const JobsOffer = ({ updateOfferNumber }: JobsOfferProps) => {
  const [slideToShow, setSlideToShow] = useState(2);
  const [currents, setCurrents] = useState(0);
  const [progress, setProgress] = useState(0);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 650) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 767) {
      setSlideToShow(1);
    }
  };
  const handleResize = () => {
    setSlides();
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const { data, isLoading, isError } = useGetJobInvitesByCandidate(
    () => {},
    onError,
  );

  // handle dynamic job numbers in header
  if (data && !isLoading && !isError) {
    updateOfferNumber(data.length);
  }

  // slider settings
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
        page={"Jobs"}
        isLoading={isLoading}
      />
    ),
    prevArrow: (
      <PrevButton
        current={currents + 1}
        length={data?.length}
        onClick={undefined}
        slideToShow={slideToShow}
        page={"Jobs"}
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
    },
  };

  useEffect(() => {
    function UpdateProgress() {
      setProgress((100 / (data?.length - slideToShow + 1)) * (currents + 1));
    }
    setTimeout(UpdateProgress, 500);
  }, [currents, data, slideToShow]);

  return (
    <>
      {isLoading ? (
        <div className="">
          {/* <Loader2 className="h-6 w-6 animate-spin" /> */}
          <Slider {...settings}>
            {[...Array(2)].map(() => {
              return (
                <div
                  className="flex items-start justify-start"
                  key={crypto.randomUUID()}
                >
                  <JobCardSkeleton page={"jobOffer"} />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <>
          {data && data?.length >= 2 ? (
            <Slider {...settings}>
              {data.map((jobData: any) => {
                return (
                  <div
                    key={crypto.randomUUID()}
                    className="flex items-start justify-start gap-3"
                  >
                    <JobsCard data={jobData} />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <>
              {data?.map((jobData: any) => {
                return (
                  <div
                    className="flex w-full pr-5 md:w-[50.3%]"
                    key={crypto.randomUUID()}
                  >
                    <JobsCard data={jobData} />
                  </div>
                );
              })}
            </>
          )}
          {/* buttons amd progessbar */}
          {data?.length > 2 && (
            <div className="mt-5 flex md:mt-4 md:items-center md:justify-center">
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
    </>
  );
};

const MemoisedJobsOffer = React.memo(JobsOffer);

const JobsOfferContainer = ({ updateOfferNumber }: JobsOfferProps) => {
  const [windowWidth] = useWindowWidth();
  const sidebarWidth = useBoundStore((state) => state.width);
  const slidesContainerWidth = sidebarWidth ? sidebarWidth + 24 : 0; // 24px is the  right padding applied by the container

  return (
    <div
      className={`mt-1`}
      style={{
        width:
          windowWidth <= 1024
            ? "100%"
            : window.innerWidth - slidesContainerWidth,
      }}
    >
      {/* Memoised to avoid re renders on width change */}
      <MemoisedJobsOffer updateOfferNumber={updateOfferNumber} />
    </div>
  );
};

export default JobsOfferContainer;

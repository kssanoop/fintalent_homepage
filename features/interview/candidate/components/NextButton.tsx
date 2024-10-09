import { ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Props {
  onClick: any;
  current: number;
  length: number;
  slideToShow: number;
  page: string;
  isLoading: boolean;
}

const NextButtton = ({
  current,
  length,
  slideToShow,
  onClick,
  page,
  isLoading,
}: Props) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const handleNextDisable = () => {
      // Calculate the maximum value of current that would allow showing the next slide
      const maxAllowedCurrent = length - slideToShow;

      if (current > maxAllowedCurrent) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };
    handleNextDisable();
  }, [current, length, slideToShow]);

  return (
    <>
      {!isLoading && (
        <div
          className={`absolute -bottom-[43px] right-3 py-1 ${
            page === "Jobs" ? "md:-bottom-9" : " md:-bottom-10"
          } md:right-0`}
          onClick={onClick}
        >
          <button className="cursor-pointer" disabled={disabled}>
            <ChevronRight size={24} color={disabled ? "#5E5E5E" : "#131A29"} />
          </button>
        </div>
      )}
    </>
  );
};
export default NextButtton;

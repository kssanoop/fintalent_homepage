import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Props {
  onClick: any;
  current: number;
  length: number;
  slideToShow: number;
  page: string;
  isLoading: boolean;
}

const PrevButton = ({ current, length, onClick, page, isLoading }: Props) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const handlePrevDisable = () => {
      if (current === 1) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };
    handlePrevDisable();
    console.log("current value", current);
    console.log("length value", length);
    console.log("Disabled value", disabled);
  }, [current, length, disabled]);
  return (
    <>
      {!isLoading && (
        <div
          className={`absolute -bottom-[43px] right-[39px] py-1 ${
            page === "Jobs" ? "md:-bottom-9" : "md:-bottom-10 "
          } md:right-[30.61px]`}
          onClick={onClick}
        >
          <button className="cursor-pointer" disabled={disabled}>
            <ChevronLeft size={24} color={disabled ? "#5E5E5E" : "#131A29"} />
          </button>
        </div>
      )}
    </>
  );
};

export default PrevButton;

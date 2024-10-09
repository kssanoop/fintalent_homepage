import React, { useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: any;
}

const RangeSlider = ({ min, max, value, onChange }: RangeSliderProps) => {
  const [thumbPosition, setThumbPosition] = useState(value);

  const handleOnChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    setThumbPosition(newValue);
    onChange(newValue);
  };

  return (
    <div className="range-slider relative h-5 w-full rounded-lg bg-[#f5f6fa]">
      <input
        type="range"
        min={min}
        max={max}
        value={thumbPosition}
        onChange={handleOnChange}
      />
      <div
        className=" translate(-50%, -50%)  absolute left-0 top-[50%] 
        h-2.5 w-2.5 transform cursor-pointer rounded-[50%]  border border-solid
         border-[#000] bg-white"
        style={{ left: `${thumbPosition}%` }}
      ></div>
    </div>
  );
};

export default RangeSlider;

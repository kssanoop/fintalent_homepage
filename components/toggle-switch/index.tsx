import React, { Dispatch, SetStateAction } from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
}

export const ToggleSwitch = ({ setIsOn, isOn }: ToggleSwitchProps) => {
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <label className="flex cursor-pointer items-center">
      <div
        className={`relative h-5 w-10 transition duration-300 ease-in-out ${
          isOn ? "bg-[#3790E3]" : "bg-gray-300"
        } rounded-full`}
      >
        <div
          className={`absolute left-1 top-1 h-3 w-3 transition-transform duration-300 ease-in-out ${
            isOn ? "translate-x-5" : "translate-x-0"
          } rounded-full bg-white`}
        />
      </div>
      <button
        onClick={handleToggle}
        className="focus:outline-none"
        aria-label="Toggle switch"
      ></button>
    </label>
  );
};

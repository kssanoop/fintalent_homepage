import React from "react";

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  return (
    <div className={`progressbar ${steps.length < 4 && "steps-2"}`}>
      <ul className="">
        {steps.map((step, index) => (
          <li
            key={step}
            className={
              index === currentStep
                ? "pending"
                : index < currentStep
                ? "done"
                : ""
            }
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressBar;

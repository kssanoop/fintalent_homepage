import React from "react";

interface EllipseProps {
  type: string;
}

const Ellipse = ({ type }: EllipseProps) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle
          cx="9"
          cy="9"
          r="9"
          fill={type === "dark" ? "#D5A323" : "#F3EBD6"}
        />
      </svg>
    </div>
  );
};

export default Ellipse;

import React from "react";

interface LinkedinIconProps {
  size?: number;
  color?: string;
}

function LinkedinIcon({ size, color = "#0076B2" }: LinkedinIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? "24"}
      height={size ?? "24"}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0_519_4745)">
        <path
          fill={color}
          d="M21.75.563H2.25a1.67 1.67 0 00-1.688 1.65V21.79a1.67 1.67 0 001.688 1.647h19.5a1.674 1.674 0 001.688-1.652V2.207A1.674 1.674 0 0021.75.563z"
        ></path>
        <path
          fill="#fff"
          d="M3.949 9.137h3.395v10.926H3.95V9.137zm1.698-5.438a1.969 1.969 0 110 3.938 1.969 1.969 0 010-3.938zm3.827 5.438h3.255v1.5h.045c.454-.859 1.56-1.764 3.212-1.764 3.439-.008 4.076 2.255 4.076 5.19v6h-3.395v-5.316c0-1.266-.023-2.895-1.765-2.895-1.741 0-2.038 1.38-2.038 2.813v5.398h-3.39V9.137z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_519_4745">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default LinkedinIcon;

import React from "react";

function RejectedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="#E72F2F" rx="5"></rect>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M7 16.812v-1.25a2.5 2.5 0 012.5-2.5h2.188M17 17.437l-3.125-3.125m0 3.125L17 14.312m-8.75-6.25a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
      ></path>
    </svg>
  );
}

export default RejectedIcon;

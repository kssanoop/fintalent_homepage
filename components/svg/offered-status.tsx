import { ApprovalStatus } from "@/features/jobs/schema/job-application-schema";
import React from "react";

interface OfferedStatusProps {
  status: ApprovalStatus;
}

function OfferedStatus({ status }: OfferedStatusProps) {
  return (
    <>
      {status === "pending" || status === "approved" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          fill="none"
          viewBox="0 0 19 19"
        >
          <path
            fill={status === "approved" ? "#00BA70" : "#A9A9A9"}
            d="M6.888 15.438l-1.129-1.81-2.137-.452.208-2.093L2.375 9.5 3.83 7.917l-.208-2.093 2.137-.452 1.128-1.81 2.02.82 2.018-.82 1.128 1.81 2.138.452-.208 2.093L15.437 9.5l-1.454 1.583.208 2.093-2.138.452-1.128 1.81-2.019-.82-2.019.82zm1.395-3.93l3.354-3.195-.83-.82-2.524 2.403-1.277-1.188-.831.792 2.108 2.007z"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          fill="none"
          viewBox="0 0 19 19"
        >
          <circle
            cx="6"
            cy="6"
            r="6"
            fill="#E72F2F"
            transform="matrix(1 0 0 -1 3 15)"
          ></circle>
          <path fill="#fff" d="M6 8H12V10H6z"></path>
        </svg>
      )}
    </>
  );
}

export default OfferedStatus;

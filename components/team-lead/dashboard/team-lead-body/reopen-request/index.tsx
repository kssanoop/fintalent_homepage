import { Card } from "@/components/ui/card";
import useGetDashboardReOpenRequest from "@/features/team-lead/api/reopen-request-dashboard";
import { useRouter } from "next/router";
import React from "react";

const ReOpenRequestCardDashboard = () => {
  const router = useRouter();
  const { data } = useGetDashboardReOpenRequest({
    role: "teamlead",
  });

  console.log("reopen:", data);
  return (
    <Card className="flex items-center justify-between p-5">
      <div className="flex flex-col">
        <h4 className="text-3xl font-bold">{data?.reopenCount}</h4>
        <p className="text-sm text-brand-grey">account reopen requests</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        onClick={() => {
          router.push("teamlead/candidates?type=reopen-requests");
        }}
        className="cursor-pointer"
      >
        <path
          d="M5.62965 3.67196L9.55809 7.83861L5.62965 12.0052C5.53591 12.1047 5.46156 12.2227 5.41083 12.3526C5.3601 12.4825 5.33398 12.6217 5.33398 12.7623C5.33398 12.9029 5.3601 13.0422 5.41083 13.1721C5.46156 13.302 5.53591 13.42 5.62965 13.5194C5.72339 13.6188 5.83467 13.6977 5.95715 13.7515C6.07962 13.8053 6.21089 13.833 6.34345 13.833C6.47602 13.833 6.60728 13.8053 6.72976 13.7515C6.85223 13.6977 6.96352 13.6188 7.05725 13.5194L11.7046 8.59032C11.7984 8.49097 11.8729 8.37296 11.9237 8.24305C11.9745 8.11314 12.0007 7.97388 12.0007 7.83324C12.0007 7.69259 11.9745 7.55333 11.9237 7.42342C11.8729 7.29351 11.7984 7.1755 11.7046 7.07615L7.05725 2.14706C6.96358 2.0475 6.85232 1.96852 6.72984 1.91463C6.60736 1.86075 6.47606 1.83301 6.34345 1.83301C6.21085 1.83301 6.07955 1.86075 5.95706 1.91463C5.83458 1.96852 5.72332 2.0475 5.62965 2.14706C5.24491 2.56587 5.23478 3.25315 5.62965 3.67196Z"
          fill="#5E5E5E"
        />
      </svg>
    </Card>
  );
};

export default ReOpenRequestCardDashboard;

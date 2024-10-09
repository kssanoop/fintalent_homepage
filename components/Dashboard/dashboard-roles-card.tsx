import React from "react";
import { Card } from "../ui/card";
import TeamLeadsIcon from "./icons/team-leads-icon";
import ManagerIcon from "./icons/manager-icon";
import RecruiterIcon from "./icons/recruiter-icon";
import { RecruitmentData, UserCounts } from "./candidates-data-bar";

interface DashboardRolesCardProps {
  RolesData: RecruitmentData;
  LoginCount: UserCounts | undefined;
}

const DashboardRolesCard = ({
  RolesData,
  LoginCount,
}: DashboardRolesCardProps) => {
  const data = [
    {
      role: "Recruiters",
      count: RolesData?.recruiters ?? 0,
      icon: <RecruiterIcon />,
    },
    {
      role: "Team leads",
      count: RolesData?.teamleads ?? 0,
      icon: <TeamLeadsIcon />,
    },
    {
      role: "Managers",
      count: RolesData?.managers ?? 0,
      icon: <ManagerIcon />,
    },
  ];
  return (
    <div className="flex w-full flex-col gap-2">
      {data?.map((item) => (
        <Card
          className="flex w-full flex-col rounded-[10px] px-6 py-5 lg:max-h-[115.66px] lg:min-w-[377px]"
          key={crypto.randomUUID()}
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                {item.icon}
                <p className="text-base font-normal text-[#5E5E5E]">
                  {item.role}
                </p>
              </div>
              <h2 className="text-[32px] font-bold text-black">{item.count}</h2>
            </div>
            {item.role === "Recruiters" && (
              <div className="self-end">
                <p className="text-sm font-normal text-[#5E5E5E]">
                  <span className="text-base font-bold">
                    {LoginCount?.recruiter}
                  </span>{" "}
                  <span className="text-base">login</span> this month
                </p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardRolesCard;

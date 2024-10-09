import React from "react";
import { Card } from "../ui/card";
import UserRoundedIcon from "./icons/user-rounded-icon";
import { Tooltip, Chart, ArcElement, Legend, Plugin } from "chart.js";
import Ellipse from "./icons/ellipse";
import { Doughnut } from "react-chartjs-2";

// Register required elements
Chart.register(ArcElement, Tooltip, Legend);

export type RecruitmentData = {
  candidate: {
    verified: number;
    unverified: number;
  };
  recruiters: number;
  teamleads: number;
  managers: number;
};

export type UserCounts = {
  admin: number;
  manager: number;
  recruiter: number;
  candidate: number;
  teamlead: number;
};

interface CandidatesDataBarProps {
  RolesData: RecruitmentData | undefined;
  LoginCount: UserCounts | undefined;
  isLoading: boolean;
}

const CandidatesDataBar = ({
  RolesData,
  LoginCount,
  isLoading,
}: CandidatesDataBarProps) => {
  const data = {
    labels: ["Verified", "Unverified"],
    datasets: [
      {
        data: [
          RolesData?.candidate?.verified ?? 0,
          RolesData?.candidate?.unverified ?? 0,
        ],
        backgroundColor: ["#D5A323", "#F3EBD6"],
        hoverBackgroundColor: ["#D5A323", "#F3EBD6"],
      },
    ],
  };

  const options = {
    cutout: 75,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      doughnutLabel: {
        labels: [
          {
            text: "34.14",
            font: {
              size: "30",
              weight: "bold",
            },
          },
        ],
      },
    },
    text1: isLoading
      ? "..."
      : `${
          RolesData?.candidate
            ? RolesData?.candidate?.verified + RolesData?.candidate?.unverified
            : 0
        }`,
    text2: isLoading ? "..." : `${LoginCount?.candidate}`,
    text3: "login this month",
  };

  // const centerTextPlugin = {
  //   id: "centerTextPlugin",
  //   afterDraw: (chart: { ctx: any; chartArea: any }) => {
  //     const { ctx, chartArea } = chart;

  //     ctx.save();
  //     const text1 = `${RolesData?.candidate?.verified}`;
  //     const text2 = `${LoginCount?.candidate}`;
  //     const text3 = "login this month";

  //     console.log("text1:", text1);
  //     console.log("text2:", text2);

  //     // Center text horizontally and vertically
  //     const x = chartArea.left + chartArea.right / 2;
  //     const y = chartArea.top + chartArea.bottom / 2;

  //     // Text 1
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     ctx.fillStyle = "#000";
  //     ctx.font = "bold 20px Arial";
  //     ctx.fillText(text1, x, y - 10);

  //     // Text 2
  //     ctx.font = "700 14px Arial";
  //     ctx.fillStyle = "#5E5E5E";
  //     ctx.fillText(text2, x, y + 18);

  //     // Text 3
  //     ctx.font = "400 14px Arial";
  //     ctx.fillStyle = "#5E5E5E";
  //     ctx.fillText(text3, x, y + 36);

  //     ctx.restore();
  //   },
  // };

  const centerText: Plugin<"doughnut", any> = {
    id: "centerText",
    afterDatasetDraw(chart, args, pluginOptions) {
      const { ctx } = chart;

      // @ts-ignore
      const text1 = chart.config.options.text1;
      // @ts-ignore
      const text2 = chart?.config?.options?.text2;
      // @ts-ignore
      const text3 = chart?.config?.options?.text3;
      // console.log(isLoading);
      ctx.save();

      const x = chart.getDatasetMeta(0).data[0].x;
      const y = chart.getDatasetMeta(0).data[0].y;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.font = "bold 24px Arial";
      ctx.fillText(text1, x, y - 10);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#5E5E5E";
      ctx.font = "bold 14px Arial";
      ctx.fillText(text2, x, y + 16);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#5E5E5E";
      ctx.font = "normal 14px Arial";
      ctx.fillText(text3, x, y + 32);
    },
  };

  return (
    <Card
      className="flex  h-[366px] w-full
     flex-col items-center gap-6 rounded-[10px]
      pb-[24.5px] pr-[31px]  pt-[21px] lg:min-w-[276px]"
    >
      <div className="flex gap-2 pl-[21px]">
        <UserRoundedIcon />
        <p className="text-base font-normal">Candidates</p>
      </div>
      {/* Doughnut chart */}
      <div className="flex flex-col items-center gap-4 pl-[37px]">
        <div>
          <div className="relative flex h-[198px] w-[198px] items-center justify-center">
            <Doughnut data={data} options={options} plugins={[centerText]} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Ellipse type="dark" />
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-bold text-[#171717]">
                {RolesData?.candidate?.verified ?? 0}
              </h3>
              <p className="text-base font-normal text-black">Verified</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Ellipse type="light" />
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-bold text-[#171717]">
                {RolesData?.candidate?.unverified ?? 0}
              </h3>
              <p className="text-base font-normal text-black">Unverified</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CandidatesDataBar;

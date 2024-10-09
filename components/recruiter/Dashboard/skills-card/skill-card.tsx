import { Card } from "@/components/ui/card";
import React, { ReactNode, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartEvent,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useGetDashboardskill } from "@/features/profile-setup/api/get-dashboard-skills";
import { truncate } from "lodash";
import SkillLoadingEffect from "./skill-loading-effect";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

const SkillCard = () => {
  const { data: chartData, isLoading, isError, error } = useGetDashboardskill();
  const router = useRouter();
  const chartRef = useRef(null);

  const data = {
    labels: chartData
      ?.slice(0, 5)
      ?.sort((a: any, b: any) => b.count - a.count)
      ?.map((item: { skill: string; count: number }) =>
        truncate(item.skill, { length: 15 }),
      ),
    datasets: [
      {
        label: "No. of Count",
        data: chartData
          ?.slice(0, 5)
          ?.sort((a: any, b: any) => b.count - a.count)
          ?.map((item: { skill: string; count: number }) => item.count),
        backgroundColor: [
          "#359EFF",
          "#B253DE",
          "#FF9A51",
          "#00BA70",
          "#FFC632",
        ],
        borderColor: chartData?.map(() => "transparent"),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
      position: "left",
      align: "left",
    },
    plugins: {
      legend: {
        position: "right" as const,
        align: "center" as const,
        padding: 0,
        labels: {
          boxWidth: 16,
          boxHeight: 16,
        },
        itemSpacing: 16,
        onClick: (e: ChartEvent) => {
          console.log("first");
          e.native?.stopPropagation();
        },
      },
    },
    onElementsClick: (elements: string | any[]) => {
      if (elements.length > 0 && chartRef.current) {
        const chartInstance = (chartRef.current as any)?.chartInstance;
        if (chartInstance?.options.plugins?.legend?.labels) {
          chartInstance.options.plugins.legend.labels.color = "red";
        }

        const canvas = chartInstance?.canvas;
        if (canvas) {
          canvas.width = 90;
          canvas.height = 90;
          canvas.gap = 24;
        }
        chartInstance.update();
      }
    },
  };

  if (isError) {
    return <div>{error as ReactNode}</div>;
  }

  return (
    <>
      {isLoading ? (
        <SkillLoadingEffect />
      ) : (
        <Card
          onClick={(e) => {
            router.push("/recruiter/candidates");
          }}
          className="flex cursor-pointer flex-col p-5 transition-all hover:shadow lg:h-[347px] lg:w-full"
        >
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-bold text-black">Top Skills</h4>
            <p className="text-base font-normal text-[#5E5E5E]">
              These are the top skills in our platform
            </p>
          </div>
          {/* pie chart */}
          <div className="relative grow px-0 pt-6">
            <Pie data={data} options={options} ref={chartRef} />
          </div>
          {chartData?.length === 0 && (
            <div className="flex h-[180px] items-center justify-center text-center text-base font-normal text-[#3790E3]">
              No Top Skills To Show
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default SkillCard;

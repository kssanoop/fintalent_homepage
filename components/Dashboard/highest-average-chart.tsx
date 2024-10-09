import React from "react";
import { Bar } from "react-chartjs-2";
// @ts-ignore
import type { _DeepPartialObject } from "react-chartjs-2";
import { Card } from "../ui/card";

function HighestAverageChart({ CTCData }: { CTCData: any }) {
  const averageCTCData = CTCData?.map((item: any) => item?.averageCTC);
  const highestCTCData = CTCData?.map((item: any) => item?.highestCTC);
  // console.log("avg data:", averageCTCData);
  // console.log("highest data:", highestCTCData);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: highestCTCData,
        label: "Highest CTC",
        borderColor: "#F1A0A0",
        backgroundColor: "#F1A0A0",
        borderWidth: 4,
        barThickness: 14,
        maxBarThickness: 12,
        borderRadius: 4,
        barPercentage: 0.25,
      },
      {
        data: averageCTCData,
        label: "Average CTC",
        borderColor: "#C5A2DC",
        backgroundColor: "#C5A2DC",
        borderWidth: 4,
        barThickness: 14,
        maxBarThickness: 12,
        borderRadius: 4,
        barPercentage: 0.25,
      },
    ],
  };

  const options: _DeepPartialObject = {
    scales: {
      x: {
        barCategoryGap: 2.4,
      },
      y: {
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        left: 12,
        right: 12,
        bottom: 17,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true,
          padding: 24,
          boxWidth: 11,
          boxHeight: 11,
          color: "#000",
          font: {
            size: 16,
            weight: 400,
            lineHeight: "normal",
          },
        },
      },
    },
  };

  return (
    <Card className="w-full lg:min-w-[49.6%]">
      <div className="relative w-full lg:max-h-[374px] ">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

export default HighestAverageChart;

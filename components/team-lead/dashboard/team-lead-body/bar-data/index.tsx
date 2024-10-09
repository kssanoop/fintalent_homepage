import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "@/components/ui/card";
import useGetHiringNumber from "@/features/dashboard/api/get-hiring-number";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
      // position: "right",
      // align: "start",
      // labels: {
      //   boxWidth: 16,
      //   boxHeight: 16,
      //   usePointStyle: true,
      // },
    },
    title: {
      display: true,
      text: "Candidate hiring status",
      align: "start" as const,
      color: "#000000",
      font: {
        size: 16,
        weight: 700,
      },
    },
  },
  layout: {
    padding: 0,
  },
};

const BarData = () => {
  const { data: hiringNumber, isLoading } = useGetHiringNumber({
    role: "teamlead",
  });

  const hiringCount =
    (hiringNumber?.hired || 0) +
    (hiringNumber?.interViewScheduled || 0) +
    (hiringNumber?.inviteAccepted || 0) +
    (hiringNumber?.invited || 0) +
    (hiringNumber?.offered || 0) +
    (hiringNumber?.rejected || 0) +
    (hiringNumber?.shortlisted || 0);

  const data = {
    labels: ["Shortlisted", "Interviewed", "Offered", "Hired", "Rejected"],
    datasets: [
      {
        data: isLoading
          ? []
          : [
              hiringNumber?.shortlisted,
              hiringNumber?.interViewScheduled,
              hiringNumber?.offered,
              hiringNumber?.hired,
              hiringNumber?.rejected,
            ],
        backgroundColor: [
          "#85BCF4",
          "#C5A2DC",
          "#EECD6C",
          "#6ADBBF",
          "#F1A0A0",
        ],
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 58,
        maxBarThickness: 52,
      },
    ],
  };

  const LegendsData = [
    {
      name: "Shortlisted",
      color: "bg-[#85BCF4]",
      value: hiringNumber?.shortlisted,
    },
    {
      name: "Interviewed",
      color: "bg-[#C5A2DC]",
      value: hiringNumber?.interViewScheduled,
    },
    {
      name: "Offered",
      color: "bg-[#EECD6C]",
      value: hiringNumber?.offered,
    },
    {
      name: "Hired",
      color: "bg-[#6ADBBF]",
      value: hiringNumber?.hired,
    },
    {
      name: "Rejected",
      color: "bg-[#F1A0A0]",
      value: hiringNumber?.rejected,
    },
  ];

  return (
    <Card className="flex basis-full justify-between gap-16 px-7 py-5 lg:max-h-[414px]">
      {hiringCount === 0 ? (
        <div className="text-center text-base text-brand-blue lg:w-[450px]">
          No data to show!
        </div>
      ) : (
        <>
          <div className="relative">
            <Bar data={data} options={options} />
          </div>
          <div className="flex flex-col gap-6 px-2.5 pt-6 lg:max-h-[296px]">
            {LegendsData?.map((item) => (
              <div className="flex items-start gap-2" key={crypto.randomUUID()}>
                <div className={`mt-1 h-4 w-4 rounded-full ${item?.color}`} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-normal text-[#5E5E5E]">
                    {item?.name}
                  </p>
                  <p className="text-base font-bold text-black">
                    {item?.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default BarData;

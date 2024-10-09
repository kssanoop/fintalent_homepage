import { Card } from "../ui/card";
import { Bar } from "react-chartjs-2";
// @ts-ignore
import type { _DeepPartialObject } from "react-chartjs-2";
interface SignupHiredChartProps {
  signuphiredData: any;
}
function SignupHiredChart({ signuphiredData }: SignupHiredChartProps) {
  const SignupData = signuphiredData?.map((item: any) => item?.signupCount);
  const HiredData = signuphiredData?.map((item: any) => item?.hiredCount);
  // console.log("signup data:", SignupData);
  // console.log("hired data:", HiredData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
        data: SignupData,
        label: "Candidates signed up",
        borderColor: "#85BCF4",
        backgroundColor: "#85BCF4",
        borderWidth: 4,
        barThickness: 14,
        maxBarThickness: 12,
        borderRadius: 4,
        barPercentage: 0.25,
      },
      {
        data: HiredData,
        label: "Candidates hired",
        borderColor: "#00BA70",
        backgroundColor: "#00BA70",
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

export default SignupHiredChart;

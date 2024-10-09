import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import UserRoundedIcon from "@/components/Dashboard/icons/user-rounded-icon";
import { Tooltip, Chart, ArcElement, Legend, Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { cn } from "@/utils/cnHelper";
import { DashboardCandidateInfo } from "@/features/dashboard/types/dashboard-candidate-info";
import useGetDashboardCandidateInfoTL from "@/features/team-lead/api/get-dashnoard-candidate-info";

// Register required elements
Chart.register(ArcElement, Tooltip, Legend);

const StaticsValue = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("font-bold text-brand-black", className)}>{children}</p>
  );
};

const StaticsLabel = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-brand-grey">{children}</p>;
};

const Statics = ({
  candidateInfo,
}: {
  candidateInfo: DashboardCandidateInfo | undefined;
}) => {
  return (
    <>
      <div>
        <StaticsValue>{candidateInfo?.totalVerifiedCandidates}</StaticsValue>
        <StaticsLabel>Verified</StaticsLabel>
      </div>
      <div>
        <StaticsValue>{candidateInfo?.onboardedCandidates}</StaticsValue>
        <StaticsLabel>Onboarded</StaticsLabel>
      </div>
      <div>
        <StaticsValue>{candidateInfo?.totalUnverifiedCandidates}</StaticsValue>
        <StaticsLabel>Non-verified</StaticsLabel>
      </div>
      <div>
        <StaticsValue className="text-[#00BA70]">
          {candidateInfo?.totalHiredCandidates}
        </StaticsValue>
        <StaticsLabel>Hired</StaticsLabel>
      </div>
    </>
  );
};

const TeamLeadCandidateDataBar = () => {
  const { data: candidateInfo, isLoading } = useGetDashboardCandidateInfoTL({
    role: "teamlead",
  });

  //   console.log("candidate info:", candidateInfo)
  const data = {
    labels: ["Verified", "Unverified"],
    datasets: [
      {
        data: [
          candidateInfo?.totalVerifiedCandidates,
          candidateInfo?.totalUnverifiedCandidates,
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
    text: isLoading ? "..." : `${candidateInfo?.totalCandidates}`,
  };
  console.log(isLoading);

  // center text plugin
  const centerText: Plugin<"doughnut", any> = {
    id: "centerText",
    afterDatasetDraw(chart, args, pluginOptions) {
      const { ctx } = chart;

      // @ts-ignore
      const text = chart.config.options.text;
      console.log(isLoading);
      ctx.save();

      const x = chart.getDatasetMeta(0).data[0].x;
      const y = chart.getDatasetMeta(0).data[0].y;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.font = "bold 20px Arial";
      ctx.fillText(text, x, y - 10);
    },
  };

  return (
    <Card className="px-8 pb-[50px] pt-4">
      <div className="mb-16 flex justify-center gap-2">
        <UserRoundedIcon />
        <p className="text-base font-normal">Candidates</p>
      </div>
      {candidateInfo?.totalVerifiedCandidates === 0 &&
      candidateInfo?.totalUnverifiedCandidates === 0 ? (
        <div className="flex h-[363px] flex-col items-center gap-[70px]">
          <div className="flex h-[198px] w-[198px] items-center justify-center text-brand-blue">
            No data found!
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[70px]">
          <div className="flex h-[198px] w-[198px] items-center justify-center">
            <Doughnut data={data} options={options} plugins={[centerText]} />
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <Statics candidateInfo={candidateInfo} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TeamLeadCandidateDataBar;

import { useEffect } from "react";
import { Chart } from "chart.js";
function RevenueChart({ revenueChartData }: { revenueChartData: number[] }) {
  console.log(revenueChartData);
  useEffect(() => {
    const ctx = document.getElementById("myChart3") as HTMLCanvasElement;
    ctx.width = window.innerWidth; // Set the width to the window's inner width
    ctx.height = 374; // Set the height to 374px
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
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
            data: revenueChartData,
            label: "Highest CTC",
            borderColor: "#00BA70",
            backgroundColor: "#00BA70",
            borderWidth: 4,
            barThickness: 58,
            maxBarThickness: 56,
            borderRadius: 4,
            barPercentage: 0.25,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            // Add this to set the gap between bars and categories
            // @ts-ignore
            barCategoryGap: 15,
          },
          y: {
            beginAtZero: true,
            max: 450,
          },
        },

        layout: {
          padding: {
            left: 12,
            right: 12,
            bottom: 18,
          },
        },
        plugins: {
          legend: {
            display: false,
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
      },
    });
  }, []);

  return (
    <>
      <div className="relative flex flex-col rounded-[10px] border border-solid border-[#E1E1E1] bg-white">
        <h4 className="px-4 pt-4 text-base font-semibold">Revenue generated</h4>
        <div className="w-full pt-5 lg:max-h-[300px]">
          <canvas id="myChart3"></canvas>
        </div>
      </div>
    </>
  );
}

export default RevenueChart;

import { useEffect } from "react";
import { Chart } from "chart.js";

// ... other imports ...

function BarChart() {
  useEffect(() => {
    const ctx = document.getElementById("myChart2") as HTMLCanvasElement;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Shortlisted", "Hired"],
        datasets: [
          {
            data: [1344, 678], // Replace with your actual data
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category", // Use "category" instead of an array with a single object
            labels: ["Shortlisted", "Hired"],
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <div className="flex w-full lg:min-h-[374px]">
        <div className="h-fit w-full rounded-[10px]  border border-[#E1E1E1] pt-0">
          <canvas id="myChart2"></canvas>
        </div>
      </div>
    </>
  );
}

export default BarChart;

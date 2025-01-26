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
import { technicalSkillProps } from "@/app/page";
import { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = {
  data: technicalSkillProps[];
};

const BarChart = ({ data }: BarChartProps) => {
  const labels = data.map((skill) => skill.name);
  const usageCounts = data.map((skill) => skill.usageCount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Kỹ năng chuyền bóng",
        data: usageCounts,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        // text: "Technical Skill Usage",
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          //   text: "Technical Skills",
        },
      },
      y: {
        title: {
          display: false,
          //   text: "Usage Count",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;

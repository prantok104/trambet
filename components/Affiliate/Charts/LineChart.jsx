import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Card from "@/components/Card";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = ({header, chartData, height}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: header,
      },
    },
  };

  const data = {
    labels: chartData?.map((label) => label.name),
    datasets: [
      {
        label: header,
        data: chartData?.map((label) => label.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Card header={header}>
      <div style={{ height: height || "400px" }}>
        <Line options={options} data={data} />
      </div>
    </Card>
  );
};

export default LineChart;

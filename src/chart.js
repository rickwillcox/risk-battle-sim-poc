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
import annotationPlugin from "chartjs-plugin-annotation";

// Register the necessary components and the annotation plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const calculatePercentiles = (dataset) => {
  // Sort the dataset by x value (attackers left)
  const sortedData = dataset.sort((a, b) => a.x - b.x);
  const total = sortedData.reduce((acc, { y }) => acc + y, 0);
  let cumulative = 0;

  const percentiles = {};

  sortedData.forEach(({ x, y }) => {
    cumulative += y;
    const percentile = cumulative / total;

    if (!percentiles["25"] && percentile >= 0.25) {
      percentiles["25"] = x;
    }
    if (!percentiles["50"] && percentile >= 0.5) {
      percentiles["50"] = x;
    }
    if (!percentiles["75"] && percentile >= 0.75) {
      percentiles["75"] = x;
    }
    if (!percentiles["90"] && percentile >= 0.9) {
      percentiles["90"] = x;
    }
  });

  return percentiles;
};

export const Chart = ({ attackers, defenders, data }) => {
  const key = `${attackers}-${defenders}`;
  const dataset = data[key].map(([x, y]) => ({ x: `${x}`, y }));

  const percentiles = calculatePercentiles(dataset);

  const chartData = {
    labels: dataset.map((d) => d.x),
    datasets: [
      {
        label: "Number of Occurrences",
        data: dataset.map((d) => d.y),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Attacker minus defenders",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Occurrences",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Distribution for ${attackers} Attackers vs ${defenders} Defenders on a Capital`,
      },
      annotation: {
        annotations: {
          25: {
            type: "line",
            xMin: percentiles["25"],
            xMax: percentiles["25"],
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            label: {
              enabled: true,
              content: "25%",
            },
          },
          50: {
            type: "line",
            xMin: percentiles["50"],
            xMax: percentiles["50"],
            borderColor: "rgb(53, 162, 235)",
            borderWidth: 2,
            label: {
              enabled: true,
              content: "50%",
            },
          },
          75: {
            type: "line",
            xMin: percentiles["75"],
            xMax: percentiles["75"],
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 2,
            label: {
              enabled: true,
              content: "75%",
            },
          },
          90: {
            type: "line",
            xMin: percentiles["90"],
            xMax: percentiles["90"],
            borderColor: "rgb(255, 205, 86)",
            borderWidth: 2,
            label: {
              enabled: true,
              content: "90%",
            },
          },
        },
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

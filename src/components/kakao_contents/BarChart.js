import React from "react";
import { Bar } from "react-chartjs-2";
import useStyles from "asset/style/style";

function BarChart(props) {
  const classes = useStyles();

  const chartData = {
    labels: props.data.map((element) => element[0]).slice(0, 7),
    datasets: [
      {
        label: "채팅 수",
        data: props.data.map((element) => element[1]).slice(0, 7),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "white",
            fontSize: 18,
          },
          gridLines: {
            color: "rgba(255, 255, 255, 0.11)",
            lineWidth: 3,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white",
            fontSize: 18,
          },
          gridLines: {
            color: "rgba(255, 255, 255, 0.11)",
            lineWidth: 3,
          },
        },
      ],
    },
  };

  const legend = {
      labels: {
        fontColor: "white",
      },
  };

  function generateRandomRGB() {
    const getRandomInt = function (max) {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const red = getRandomInt(256);
    const green = getRandomInt(256);
    const blue = getRandomInt(256);

    return "rgba(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ", ";
  }

  const backgroundColor = [];
  const borderColor = [];

  chartData.datasets[0].data.forEach((element) => {
    const rgb = generateRandomRGB();
    backgroundColor.push(rgb + "0.6)");
    borderColor.push(rgb + "1)");
  });

  chartData.datasets[0]["backgroundColor"] = backgroundColor;
  chartData.datasets[0]["borderColor"] = borderColor;

  return (
    <div className={classes.chartContainer}>
      <Bar data={chartData} options={options} legend={legend} />
    </div>
  );
}

export default BarChart;

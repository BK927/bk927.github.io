import React from "react";
import { Bar } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";
import generateChartColor from "util/generateChartColor";

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
      x: {
        grid: {
          drawBorder: false,
          color: "rgba(255, 255, 255, 0.0)",
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const legend = {};

  const colors = generateChartColor(chartData.datasets[0]);

  chartData.datasets[0]["backgroundColor"] = colors.backgroundColor;
  chartData.datasets[0]["borderColor"] = colors.borderColor;

  return (
    <Paper className={classes.chartContainer} elevation={2}>
      <Bar data={chartData} options={options} legend={legend} />
    </Paper>
  );
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BarChart;

import { Bar } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import generateChartColor from "util/generateChartColor";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "0 auto",
    padding: theme.spacing(1),
    maxHeight: theme.spacing(50),
    borderRadius: "5px",
    overflow: "hidden",
    width: "100%",
    paddingBottom: "56.25%" /* 16:9 */,
    height: 0,
    minWidth: 0,
    backgroundColor: theme.palette.background.dp02,
    "& * ": {
      transition: "none",
    },
    "& canvas": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100% !important",
      height: "100% !important",
    },
  },
}));

function BarChart({ data }) {
  const classes = useStyles();

  const chartData = {
    labels: data.map((element) => element[0]).slice(0, 7),
    datasets: [
      {
        label: "채팅 수",
        data: data.map((element) => element[1]).slice(0, 7),
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
    <Paper className={classes.root} elevation={2}>
      <Bar data={chartData} options={options} legend={legend} />
    </Paper>
  );
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BarChart;

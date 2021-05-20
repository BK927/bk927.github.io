import React from "react";
import { Bar } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";
import generateChartColor from "util/generateChartColor";

function FacetChart({ facets }) {
  const classes = useStyles();

  const chartData = {
    labels: facets.map((element) => element.name),
    datasets: [
      {
        data: facets.map((element) => element.score),
        backgroundColor: ["rgba(255, 255, 255, 0.4)"],
        borderColor: ["rgba(255, 255, 255, 0.7)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: "y",
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 100,
        grid: {
          drawBorder: false,
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "rgba(255, 255, 255, 0)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const legend = {};

  return (
    <Paper className={classes.chartContainer} elevation={2}>
      <Bar data={chartData} options={options} legend={legend} />
    </Paper>
  );
}

FacetChart.propTypes = {
  facets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FacetChart;

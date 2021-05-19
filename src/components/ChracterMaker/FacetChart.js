import React from "react";
import { Bar } from "react-chartjs-2";
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

  const colors = generateChartColor(chartData.datasets[0]);

  chartData.datasets[0]["backgroundColor"] = colors.backgroundColor;
  chartData.datasets[0]["borderColor"] = colors.borderColor;

  return (
    <div className={classes.chartContainer}>
      <Bar data={chartData} options={options} legend={legend} />
    </div>
  );
}

FacetChart.propTypes = {
  facets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FacetChart;

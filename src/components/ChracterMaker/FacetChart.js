import { Bar } from "react-chartjs-2";
import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "0 auto",
    padding: theme.spacing(1),
    maxHeight: theme.spacing(50),
    borderRadius: "5px",
    overflow: "hidden",
    width:"100%",
    paddingBottom:'56.25%', /* 16:9 */
    height: 0,
    minWidth: 0,
    "& * ": {
      transition: "none",
    },
    "& canvas": {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100% !important',
      height: '100% !important',
    },
  },
}));

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



  return (
    <Box className={classes.root}>
      <Bar data={chartData} options={options} />
    </Box>
  );
}

FacetChart.propTypes = {
  facets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FacetChart;

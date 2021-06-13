import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    width: "100%",
    padding: 0,
    listStyleType: "none",
    "& li": {
      backgroundColor: theme.palette.background.dp02,
      padding: theme.spacing(1.5),
      margin: "0.3rem 0",
      overflow: "visible",
      whiteSpace: "nowrap",
      transition: theme.transitions.create(["all"], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    "& li:hover": {
      backgroundColor: theme.palette.background.dp06,
    },
  },
}));

function Ranking(props) {
  const classes = useStyles();
  const list = props.data;

  const sumOfItems = list.reduce((acc, value) => acc + value[1], 0);
  const largestNum = list[0][1];
  const liTags = list.map((element, index) => {
    const percent = Math.round((element[1] / sumOfItems) * 10000) / 100;
    const textContent = String(element[0]) + " (" + String(percent) + "%)";
    const width = String((element[1] * 100) / largestNum) + "%";
    return (
      <li key={index} style={{ width: width }}>
        {String(index) + ". " + textContent}
      </li>
    );
  });

  return <ol className={classes.root}>{liTags}</ol>;
}

Ranking.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Ranking;

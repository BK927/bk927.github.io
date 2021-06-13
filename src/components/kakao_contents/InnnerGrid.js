import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexBasis: "0",
    gap: theme.spacing(2),
    alignContent: "space-between",
    "& > div": {
      backgroundColor: theme.palette.background.dp02,
      borderRadius: "5px",
      padding: "8px 15px",
      flex: "1",
    },
    "& > div > h4": {
      display: "block",
      marginBottom: "15px",
    },
  },
}));

function InnnerGrid({ cells }) {
  const classes = useStyles();

  const cellList = cells.map((element, index) => {
    return (
      <Paper key={index} elevation={1}>
        <h4>{element.title}</h4>
        <h5>{element.text}</h5>
      </Paper>
    );
  });

  return <div className={classes.root}>{cellList}</div>;
}

InnnerGrid.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InnnerGrid;

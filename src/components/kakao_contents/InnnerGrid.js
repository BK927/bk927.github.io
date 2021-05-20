import React from "react";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";

function InnnerGrid(props) {
  const classes = useStyles();

  const cellList = props.cells.map((element, index) => {
    return (
      <Paper key={index} elevation={1}>
        <h4>{element.title}</h4>
        <h5>{element.text}</h5>
      </Paper>
    );
  });

  return <div className={classes.innerGrid}>{cellList}</div>;
}

InnnerGrid.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InnnerGrid;

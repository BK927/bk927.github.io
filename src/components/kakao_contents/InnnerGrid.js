import React from "react";
import useStyles from "asset/style/style";

function InnnerGrid(props) {
  const classes = useStyles();

  const cellList = props.cells.map((element, index) => {
    return (
      <div key={index}>
        <h4>{element.title}</h4>
        <h5>{element.text}</h5>
      </div>
    );
  });

  return <div className={classes.innerGrid}>{cellList}</div>;
}

export default InnnerGrid;

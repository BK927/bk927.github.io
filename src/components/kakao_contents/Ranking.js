import React from "react";
import useStyles from "asset/style/style";

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
        {String(index) + '. ' + textContent}
      </li>
    );
  });

  return <ol className={classes.rankingList}>{liTags}</ol>;
}

export default Ranking;

import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";

function KakaoContent({ index, title, items }) {
  const classes = useStyles();

  const components = items.map((element, index) => {
    const data = element["calcDataFunc"]();
    return element["createNodefunc"](data, index);
  });
  return (
    <Paper className={classes.contentBox} elevation={3} key={index}>
      <h3>{title}</h3>
      {components}
    </Paper>
  );
}

KakaoContent.propTypes = {
  items: PropTypes.array.isRequired,
};

export default KakaoContent;

import React from "react";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";

function KakaoContent(props) {
  const classes = useStyles();
  const state = {
    items: props.items,
  };

  const components = state.items.map((element, index) => {
    const value = element[1]();
    return element[0](value);
  });
  return (
    <Paper className={classes.contentBox} elevation={3} key={props.index}>
      <h3>{props.title}</h3>
      {components}
    </Paper>
  );
}

export default KakaoContent;

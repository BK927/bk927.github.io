import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";

//TODO: Add loading screen
function KakaoContent({ index, title, items }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const components = items.map((element, index) => {
    const data = element["calcDataFunc"]();
    return element["createNodefunc"](data, index);
  });
  return (
    <Paper className={classes.contentBox} elevation={3} key={index}>
      <Typography variant="h5">{title}</Typography>
      {components}
      {/* {loading ? <CircularProgress /> : { components }} */}
    </Paper>
  );
}

KakaoContent.propTypes = {
  items: PropTypes.array.isRequired,
};

export default KakaoContent;

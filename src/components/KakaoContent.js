import React, { useEffect, useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";

//TODO: Improve response speed(loading screen), Fix TypeError
function KakaoContent({ index, title, items }) {
  const classes = useStyles();
  const [components, setComponents] = useState(
    items.map((element, index) => {
      return <CircularProgress key={index} className={classes.loadingCircle} />;
    })
  );

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setComponents(
        items.map((element, index) => {
          const data = element["calcDataFunc"]();
          return element["createNodefunc"](data, index);
        })
      );
    }
  }, [items]);

  return (
    <Paper className={classes.contentBox} elevation={3} key={index} ref={mounted}>
      <Typography variant="h5">{title}</Typography>
      {components}
    </Paper>
  );
}

KakaoContent.propTypes = {
  items: PropTypes.array.isRequired,
};

export default KakaoContent;

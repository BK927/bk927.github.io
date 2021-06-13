import React, { useEffect, useRef, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contentBox: {
    position: "relative",
    display: "block",
    boxSizing: "content-box",
    borderRadius: "5px",
    overflow: "hidden",
    height: "max-content",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(2),
    "&&": {
      backgroundColor: theme.palette.background.dp01,
    },
    "& h5": {
      display: "block",
      marginBottom: theme.spacing(3.5),
    },
  },
  loadingCircle: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    marginLeft: "auto",
    marginRight: "auto",
    "&&": {
      display: "block",
    },
  },
}));

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
    <Paper
      className={classes.contentBox}
      elevation={3}
      key={index}
      ref={mounted}
    >
      <Typography variant="h5">{title}</Typography>
      {components}
    </Paper>
  );
}

KakaoContent.propTypes = {
  items: PropTypes.array.isRequired,
};

export default KakaoContent;

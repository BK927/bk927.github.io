import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";
import useDocumentTitle from "hooks/useDocumentTitle";

const Portfolio = ({ title }) => {
  const classes = useStyles();
  useDocumentTitle(title);

  return (
    <Fragment>
      <h2>포트폴리오</h2>{" "}
      <Paper className={classes.contentBox} elevation={3}>
        <h4>작성 중</h4>
      </Paper>
    </Fragment>
  );
};

export default Portfolio;

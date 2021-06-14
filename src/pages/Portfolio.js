import React, { Fragment } from "react";

import Paper from "@material-ui/core/Paper";
import ReactHelmet from "components/ReactHelmet";
import useStyles from "asset/style/style";

const Portfolio = ({ title }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <ReactHelmet
        title="포트폴리오"
        description="BK927의 개인 개발 포트폴리오입니다."
        keywords="BK927 포트폴리오"
      />
      <h2>포트폴리오</h2>{" "}
      <Paper className={classes.contentBox} elevation={3}>
        <h4>작성 중</h4>
      </Paper>
    </Fragment>
  );
};

export default Portfolio;

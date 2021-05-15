import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import useStyles from "asset/style/style";

const CharacterMaker = () => {
    const classes = useStyles();
    return (
        <Fragment>
        <h2>캐릭터 메이커</h2>{" "}
        <Paper className={classes.contentBox} elevation={3}>
          <h4>제작 중</h4>
        </Paper>
      </Fragment>
    );
};

export default CharacterMaker;
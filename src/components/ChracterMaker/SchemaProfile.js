import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import SchemaContainer from "components/ChracterMaker/SchemaContainer";
import UnconditinalScehma from "asset/UnconditinalScehma";
import getRandomInt from "util/getRandomInt";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.dp02,
  },
}));

function SchemaProfile({ schemaCount }) {
  const classes = useStyles();

  let leftSchema = UnconditinalScehma.slice();
  const SchemaList = [];

  for (let i = 0; i < schemaCount; i++) {
    const index = getRandomInt(leftSchema.length);
    const schema = leftSchema[index];
    const flag = Boolean(getRandomInt(2));
    SchemaList.push(<SchemaContainer conditionalFlag={flag} schemaObj={schema} />);
    leftSchema = leftSchema.filter(function (value, index, arr) {
      return value !== schema;
    });
  }

  return (
    <Paper className={classes.root} elevation={3}>
      {SchemaList}
    </Paper>
  );
}

SchemaProfile.propTypes = {
  schemaCount: PropTypes.number.isRequired,
};

export default SchemaProfile;

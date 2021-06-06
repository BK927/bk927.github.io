import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import SchemaModal from "components/ChracterMaker/SchemaModal";
import SchemaItem from "components/ChracterMaker/SchemaItem";
import UnconditinalScehma from "asset/UnconditinalScehma";
import getRandomInt from "util/getRandomInt";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.dp02,
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    justifyContent: "center",
  },
  halfContainer: {
    display: "grid",
    columnGap: theme.spacing(8.2),
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

function SchemaProfile({ schemaCount }) {
  const classes = useStyles();

  let leftSchema = UnconditinalScehma.slice();
  const singleSchemaList = [];
  const combinedSchemaList = [];

  for (let i = 0; i < schemaCount; i++) {
    const index = getRandomInt(leftSchema.length);
    const schema = leftSchema[index];
    const flag = Boolean(getRandomInt(2));
    if (flag) {
      combinedSchemaList.push(<SchemaItem key={i} conditionalFlag={flag} schemaObj={schema} />);
    } else {
      singleSchemaList.push(<SchemaItem key={i} conditionalFlag={flag} schemaObj={schema} />);
    }

    leftSchema = leftSchema.filter(function (value, index, arr) {
      return value !== schema;
    });
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <Box className={classes.title}>
        <Typography align="center" display="block" variant="h4">
          캐릭터의 결함(심리도식)
        </Typography>
        <SchemaModal />
      </Box>
      {combinedSchemaList}
      <Box className={classes.halfContainer}>{singleSchemaList}</Box>
    </Paper>
  );
}

SchemaProfile.propTypes = {
  schemaCount: PropTypes.number.isRequired,
};

export default SchemaProfile;

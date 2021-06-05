import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SchemaAndDomain from "components/ChracterMaker/SchemaAndDomain";
import getRandomInt from "util/getRandomInt";
import UnconditinalScehma from "asset/UnconditinalScehma";
import ConditionalSchema from "asset/ConditionalSchema";
import SchemaCopingStyle from "asset/SchemaCopingStyle";
import AddIcon from "@material-ui/icons/Add";
import CopingStyle from "components/ChracterMaker/CopingStyle";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    "&>:nth-child(odd)": {
      flex: 1,
      alignSelf: "stretch",
    },
    "&>:nth-child(2)": {
      width: "50px",
    },
  },
  uncondRoot: {
    width: "50%",
  },
  container: {
    padding: theme.spacing(1.3),
    backgroundColor: theme.palette.background.dp03,
  },
  plusIcon: {
    margin: theme.spacing(1),
  },
}));

function SchemaItem({ schemaObj, conditionalFlag }) {
  const classes = useStyles();

  const uncond = schemaObj ? schemaObj : UnconditinalScehma[getRandomInt(UnconditinalScehma.length)];
  const cond = ConditionalSchema[getRandomInt(ConditionalSchema.length)];

  const getCopingStyle = function (schema, count) {
    let leftCopingStyle = Object.getOwnPropertyNames(SchemaCopingStyle);
    const nodes = [];

    for (let i = 0; i < count; i++) {
      const index = getRandomInt(leftCopingStyle.length);
      const key = leftCopingStyle[index];
      const copingStyle = SchemaCopingStyle[key];
      const examples = copingStyle.examples[schema];
      nodes.push(
        <CopingStyle
          key={i}
          count={i + 1}
          name={key}
          description={copingStyle.description}
          behaviors={copingStyle.behaviors}
          examples={examples}
        />
      );
      leftCopingStyle = leftCopingStyle.filter(function (value, index, arr) {
        return value !== key;
      });
    }

    return nodes;
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.container} elevation={2}>
        <SchemaAndDomain
          schema={uncond.schema}
          description={uncond.description}
          behaviors={uncond.behaviors}
          backgrounds={uncond.backgrounds}
          domain={uncond.domain}
        />
        {getCopingStyle(uncond.schema, getRandomInt(2) + 1)}
      </Paper>

      {conditionalFlag ? (
        <Fragment>
          <AddIcon className={classes.plusIcon} fontSize="large" />
          <Paper className={classes.container} elevation={2}>
            <SchemaAndDomain
              schema={cond.schema}
              description={cond.description}
              behaviors={cond.behaviors}
              backgrounds={cond.backgrounds}
              domain={cond.domain}
            />
            {getCopingStyle(cond.schema, getRandomInt(2) + 1)}
          </Paper>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Box>
  );
}

SchemaItem.propTypes = {
  schemaObj: PropTypes.object,
  conditionalFlag: PropTypes.bool.isRequired,
};

SchemaItem.defaultProps = {
  schemaObj: null,
};

export default SchemaItem;

import React, { Fragment } from "react";

import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Box from "@material-ui/core/Box";
import ConditionalSchema from "asset/ConditionalSchema";
import CopingStyle from "components/ChracterMaker/CopingStyle";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import SchemaAndDomain from "components/ChracterMaker/SchemaAndDomain";
import SchemaCopingStyle from "asset/SchemaCopingStyle";
import UnconditinalScehma from "asset/UnconditinalScehma";
import getRandomInt from "util/getRandomInt";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: 'row',
    margin: theme.spacing(2.5, 'auto'),
    "&>:nth-child(odd)": {
      flex: 1,
      alignSelf: "stretch",
    },
    "&>:nth-child(2)": {
      width: theme.spacing(3),
      height: '100%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: theme.spacing(3),
      },
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  uncondRoot: {
    width: "50%",
  },
  item: {
    padding: theme.spacing(1.3),
    backgroundColor: theme.palette.background.dp03,
  },
  iconWrapper:{
    position: 'relative',
    margin: theme.spacing(0),
  },
  plusIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '3rem',
    [theme.breakpoints.down('md')]: {
      transform: 'rotate(90deg) translate(-50%, 50%)',
    },
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
      <Paper className={classes.item} elevation={2}>
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
          <div className={classes.iconWrapper}>
            <AllInclusiveIcon className={classes.plusIcon} fontSize="large" />
          </div>
          <Paper className={classes.item} elevation={2}>
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

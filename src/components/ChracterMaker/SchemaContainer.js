import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SchemaDetail from "components/ChracterMaker/SchemaDetail";
import getRandomInt from "util/getRandomInt";
import UnconditinalScehma from "asset/UnconditinalScehma";
import ConditionalSchema from "asset/ConditionalSchema";
import AddIcon from "@material-ui/icons/Add";

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
  plusIcon: {
    margin: theme.spacing(1),
  },
}));

function SchemaContainer({ schemaObj, conditionalFlag }) {
  const classes = useStyles();

  const uncond = schemaObj ? schemaObj : UnconditinalScehma[getRandomInt(UnconditinalScehma.length)];
  const cond = ConditionalSchema[getRandomInt(ConditionalSchema.length)];

  return (
    <Box className={classes.root}>
      <SchemaDetail
        schema={uncond.schema}
        description={uncond.description}
        behaviors={uncond.behaviors}
        backgrounds={uncond.backgrounds}
        domain={uncond.domain}
      />
      {conditionalFlag ? (
        <Fragment>
          <AddIcon className={classes.plusIcon} fontSize="large" />
          <SchemaDetail
            schema={cond.schema}
            description={cond.description}
            behaviors={cond.behaviors}
            backgrounds={cond.backgrounds}
            domain={cond.domain}
          />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Box>
  );
}

SchemaContainer.propTypes = {
  schemaObj: PropTypes.object,
  conditionalFlag: PropTypes.bool.isRequired,
};

SchemaContainer.defaultProps = {
  schemaObj: null,
};

export default SchemaContainer;

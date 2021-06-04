import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import getRandomInt from "util/getRandomInt";
import SchemaCopingStyle from "asset/SchemaCopingStyle";
import SchemaDomain from "asset/SchemaDomain";
import UnconditinalScehma from "asset/UnconditinalScehma";
import ConditionalSchema from "asset/ConditionalSchema";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.dp02,
  },
}));

function SchemeProfile({ schemaCount }) {
  const [domains, setDomains] = useState(SchemaDomain);
  const [condSchema, setCondSchema] = useState(ConditionalSchema);
  const [uncondSchema, setUncondSchema] = useState(UnconditinalScehma);
  const [copingStyles, setCopingStyles] = useState(SchemaCopingStyle);
  const classes = useStyles();

  const generateSchemas = function (condSchemaFlag) {
    const {
      schema,
      description: schemaDesc,
      cognitions,
      backgrounds,
      domain,
    } = uncondSchema[getRandomInt(uncondSchema.length)];

    const { coreEmotionalNeed, coreBelief, description: domainDesc } = domains[domain];

    return (
      <Paper elevation={2}>
        <Typography>{schema}</Typography>
        <Typography>{schemaDesc}</Typography>
        {cognitions.map((element, index) => {
          return <Typography>{element}</Typography>;
        })}
        {backgrounds.map((element, index) => {
          return <Typography>{element}</Typography>;
        })}
      </Paper>
    );
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Paper></Paper>
    </Paper>
  );
}

SchemeProfile.propTypes = {
  schemaCount: PropTypes.number,
};

SchemeProfile.defaultProps = {
  schemaCount: null,
};

export default SchemeProfile;

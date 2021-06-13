import React, { Fragment } from "react";

import CollapseContent from "components/ChracterMaker/CollapseContent";
import DescriptionIcon from "@material-ui/icons/Description";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import SchemaDomain from "asset/SchemaDomain";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1.5, "auto"),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1.5),
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  titleCell: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  list: {
    "& .MuiListItemText-primary": {
      fontWeight: 500,
    },
    "& .MuiListItemText-secondary": {
      color: "#F2F2F2",
      marginTop: theme.spacing(1),
    },
  },
}));

function SchemaAndDomain({
  schema,
  description,
  behaviors,
  backgrounds,
  domain,
  copingStyles,
}) {
  const classes = useStyles();

  function createRow(title, content) {
    return (
      <Fragment>
        <ListItem>
          <ListItemText primary={title} secondary={content} />
        </ListItem>
        <Divider component="li" />
      </Fragment>
    );
  }

  const generateList = (element, index) => <li key={index}>{element}</li>;

  const behaviorsList = behaviors.map(generateList);
  const backgroundList = backgrounds.map(generateList);

  const domainRows = [
    createRow("영역(분류)", domain),
    createRow("핵심 믿음", SchemaDomain[domain].coreBelief),
    createRow("핵심 감정 욕구", SchemaDomain[domain].coreEmotionalNeed),
    createRow("영역 해설", SchemaDomain[domain].description),
  ];

  const schemaRows = [
    createRow("설명", description),
    createRow("행동 예시", <ul>{behaviorsList}</ul>),
    createRow("과거 배경 예시", <ul>{backgroundList}</ul>),
  ];

  return (
    <div>
      <Typography
        align="center"
        className={classes.root}
        gutterBottom={true}
        variant="h5"
      >
        {schema}
      </Typography>
      <CollapseContent
        title={"도식 설명"}
        icon={<DescriptionIcon />}
        content={<List className={classes.list}>{schemaRows}</List>}
      />
      <CollapseContent
        title={"도식의 영역(분류)"}
        icon={<DescriptionIcon />}
        content={<List className={classes.list}>{domainRows}</List>}
      />
    </div>
  );
}

SchemaAndDomain.propTypes = {
  schema: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgrounds: PropTypes.arrayOf(PropTypes.string).isRequired,
  domain: PropTypes.string.isRequired,
  copingStyles: PropTypes.arrayOf(PropTypes.string),
};

export default SchemaAndDomain;

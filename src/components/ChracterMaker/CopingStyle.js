import CollapseContent from "components/ChracterMaker/CollapseContent";
import Divider from "@material-ui/core/Divider";
import { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

function CopingStyle({ count, name, description, behaviors, examples }) {
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

  const behaviorList = behaviors.map(generateList);

  const exampleList = Array.from(examples).map(generateList);

  const rows = [
    createRow("설명", description),
    createRow("행동 패턴", <ul>{behaviorList}</ul>),
    createRow("예시", <ul>{exampleList}</ul>),
  ];

  return (
    <CollapseContent
      title={" 대처 방식" + String(count) + " : " + name}
      icon={<SupervisorAccountIcon />}
      content={<List className={classes.list}>{rows}</List>}
    />
  );
}

CopingStyle.propTypes = {
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
  examples: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CopingStyle;

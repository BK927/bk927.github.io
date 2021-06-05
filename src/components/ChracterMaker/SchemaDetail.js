import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import SchemaDomain from "asset/SchemaDomain";
import SchemaCopingStyle from "asset/SchemaCopingStyle";
import getRandomInt from "util/getRandomInt";
import CopingStyle from "components/ChracterMaker/CopingStyle";
import ClassIcon from "@material-ui/icons/Class";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.3),
    backgroundColor: theme.palette.background.dp03,
    "& hr": {
      marginTop: theme.spacing(1.3),
      marginBottom: theme.spacing(1.3),
    },
  },
  subtitle: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1.5),
  },
  titleCell: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
}));

function SchemaDetail({ schema, description, behaviors, backgrounds, domain, copingStyles }) {
  const classes = useStyles();

  function createRow(title, content) {
    return { title, content };
  }

  const behaviorsList = behaviors.map((element, index) => <li>{element}</li>);
  const backgroundList = backgrounds.map((element, index) => <li>{element}</li>);

  const copingStyleCount = getRandomInt(2) + 1;

  let leftStyle = Object.getOwnPropertyNames(SchemaCopingStyle);
  const styleNodes = [];

  for (let i = 0; i < copingStyleCount; i++) {
    const index = getRandomInt(leftStyle.length);
    const styleKey = leftStyle[index];
    const style = SchemaCopingStyle[styleKey];
    styleNodes.push(
      <CopingStyle
        key={i}
        count={i + 1}
        name={styleKey}
        description={style.description}
        behaviors={style.behaviors}
        examples={style.examples[schema]}
      />
    );
    leftStyle = leftStyle.filter(function (value, index, arr) {
      return value !== style;
    });
  }

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
    <TableContainer component={Paper} className={classes.root} elevation={2}>
      <Typography align="center" gutterBottom={true} variant="h5">
        {schema}
      </Typography>
      <Typography className={classes.subtitle} variant="h6">
        <ClassIcon />
        도식의 영역(분류)
      </Typography>
      <Table aria-label="simple table">
        <TableBody>
          {domainRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={classes.titleCell} align="left">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography className={classes.subtitle} variant="h6">
        <DescriptionIcon />
        도식 해설
      </Typography>
      <Table aria-label="simple table">
        <TableBody>
          {schemaRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={classes.titleCell} align="left">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {styleNodes}
    </TableContainer>
  );
}

SchemaDetail.propTypes = {
  schema: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgrounds: PropTypes.arrayOf(PropTypes.string).isRequired,
  domain: PropTypes.string.isRequired,
  copingStyles: PropTypes.arrayOf(PropTypes.string),
};

export default SchemaDetail;

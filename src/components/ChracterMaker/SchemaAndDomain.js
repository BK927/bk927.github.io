import Box from "@material-ui/core/Box";
import ClassIcon from "@material-ui/icons/Class";
import DescriptionIcon from "@material-ui/icons/Description";
import PropTypes from "prop-types";
import React from "react";
import SchemaDomain from "asset/SchemaDomain";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1.5, 'auto'),
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1.5),
  },
  titleCell: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
}));

function SchemaAndDomain({ schema, description, behaviors, backgrounds, domain, copingStyles }) {
  const classes = useStyles();

  function createRow(title, content) {
    return { title, content };
  }

  const behaviorsList = behaviors.map((element, index) => <li key={index}>{element}</li>);
  const backgroundList = backgrounds.map((element, index) => <li key={index}>{element}</li>);

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
    <TableContainer>
      <Typography align="center" className={classes.root} gutterBottom={true} variant="h5">
        {schema}
      </Typography>
      <Box className={classes.title}>
        <ClassIcon />
        <Typography className={classes.subtitle} variant="h6">
          &nbsp;도식의 영역(분류)
        </Typography>
      </Box>

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
      <Box className={classes.title}>
        <DescriptionIcon />
        <Typography className={classes.subtitle} variant="h6">
          &nbsp;도식 해설
        </Typography>
      </Box>

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
    </TableContainer>
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

import CollapseContent from "components/ChracterMaker/CollapseContent"
import DescriptionIcon from "@material-ui/icons/Description";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
}));

function SchemaAndDomain({ schema, description, behaviors, backgrounds, domain, copingStyles }) {
  const classes = useStyles();


  function createRow(title, content) {
    return { title, content };
  }

  const generateList = (element, index) => <ListItem><ListItemText key={index} primary={element} /></ListItem>;

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
    createRow("행동 예시", <List dense>{behaviorsList}</List>),
    createRow("과거 배경 예시", <ul>{backgroundList}</ul>),
  ];

  const schemaSection = (      <TableContainer>      <Table aria-label="schema table">
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
      </Table></TableContainer>);

const domainSection = (      <TableContainer>      <Table aria-label="domain table">
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
</Table></TableContainer>);

  return (
    <div>
      <Typography align="center" className={classes.root} gutterBottom={true} variant="h5">
        {schema}
      </Typography>
      <CollapseContent title={"도식 설명"} icon={<DescriptionIcon />} content={schemaSection} />
      <CollapseContent title={"도식의 영역(분류)"} icon={<DescriptionIcon />} content={domainSection} />
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

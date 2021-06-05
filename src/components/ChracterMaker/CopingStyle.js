import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1.5),
  },
  titleCell: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
}));

function CopingStyle({ count, name, description, behaviors, examples }) {
  const classes = useStyles();

  function createRow(title, content) {
    return { title, content };
  }

  const behaviorList = behaviors.map((element, index) => {
    return <li key={index}>{element}</li>;
  });

  const exampleList = examples.slice().map((element, index) => {
    return <li key={index}>{element}</li>;
  });

  const rows = [
    createRow("설명", description),
    createRow("행동 패턴", <ul>{behaviorList}</ul>),
    createRow("예시", <ul>{exampleList}</ul>),
  ];

  return (
    <TableContainer>
      <Typography className={classes.subtitle} variant="h6">
        <SupervisorAccountIcon />
        대처 방식{count} : {name}
      </Typography>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row, index) => (
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

CopingStyle.propTypes = {
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
  examples: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CopingStyle;

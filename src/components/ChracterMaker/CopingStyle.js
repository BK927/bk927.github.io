import CollapseContent from "components/ChracterMaker/CollapseContent"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from "prop-types";
import React from "react";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

  const generateList = (element, index) => <ListItem><ListItemText key={index} primary={element} /></ListItem>;


  const behaviorList = behaviors.map(generateList);

  const exampleList = Array.from(examples).map(generateList);

  const rows = [
    createRow("설명", description),
    createRow("행동 패턴", <List dense>{behaviorList}</List>),
    createRow("예시", <List dense>{exampleList}</List>),
  ];

  const content = (    <TableContainer>
      <Table aria-label="copin-style table">
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
  </TableContainer>);

  return (
<CollapseContent title={" 대처 방식" + String(count) + ' : ' + name} icon={<SupervisorAccountIcon />} content={content} />);
}

CopingStyle.propTypes = {
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  behaviors: PropTypes.arrayOf(PropTypes.string).isRequired,
  examples: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CopingStyle;

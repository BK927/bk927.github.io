import React from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
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

function CopingStyle({ count, name, description, behaviors, examples }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function createRow(title, content) {
    return { title, content };
  }

  const behaviorList = behaviors.map((element, index) => {
    return <li key={index}>{element}</li>;
  });

  const exampleList = Array.from(examples).map((element, index) => {
    return <li key={index}>{element}</li>;
  });

  const rows = [
    createRow("설명", description),
    createRow("행동 패턴", <ul>{behaviorList}</ul>),
    createRow("예시", <ul>{exampleList}</ul>),
  ];

  return (
    <TableContainer>
      <Box className={classes.header}>
        <Box className={classes.title}>
          <SupervisorAccountIcon />
          <Typography variant="h6">
            &nbsp;대처 방식{count} : {name}
          </Typography>
        </Box>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
      </Collapse>
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

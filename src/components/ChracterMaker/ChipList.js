import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dp03,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2.3),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function ChipList({ title, items }) {
  const classes = useStyles();

  const chips = items.map((element, index) => {
    return <Chip component='div' className={classes.chip} label={element} key={index} />;
  });

  return (
    <Paper className={classes.root} elevation={2}>
      <Typography align="center" className={classes.title} display="block" variant="h5">
        {title}
      </Typography>
      {chips}
    </Paper>
  );
}

ChipList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChipList;

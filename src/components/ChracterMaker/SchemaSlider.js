import PropTypes from "prop-types";
import React from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 1,
    label: "평면적",
  },
  {
    value: 2,
    label: "입체적",
  },
  {
    value: 3,
    label: "매우 입체적",
  },
];

function valuetext(value) {
  return `${value}도식`;
}

export default function SchemaSlider({ onChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        캐릭터의 입체도
      </Typography>
      <Slider
        min={1}
        max={3}
        defaultValue={2}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        marks={marks}
        step={null}
        valueLabelDisplay="off"
        onChange={onChange}
      />
    </div>
  );
}

SchemaSlider.propTypes = {
  onChange: PropTypes.func,
};

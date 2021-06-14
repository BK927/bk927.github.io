import React, { Fragment } from "react";

import Box from "@material-ui/core/Box";
import InfoModal from "components/InfoModal";
import PropTypes from "prop-types";
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
  title: {
    display: "flex",
    alignItems: "center",
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

  const modalTitle = "캐릭터의 입체도";
  const modalContent = (
    <Fragment>
      <Typography variant="body1" gutterBottom>
        심리 도식의 갯수를 결정합니다. 작품에 나오는 캐릭터는 심리 도식에 의해서{" "}
        <Box component="span" fontWeight="fontWeightBold" fontStyle="italic">
          상황에 따라 다른 면모
        </Box>
        ,{" "}
        <Box component="span" fontWeight="fontWeightBold" fontStyle="italic">
          본인 조차 깨닫지 못하는 자신의 결점
        </Box>{" "}
        등을 가지게 됩니다.
      </Typography>
      <Typography gutterBottom variant="body1">
        일반적으로 심리 도식의 수가 많으면 캐릭터가 입체적일 확률이 높습니다.
        하지만 적은 심리 도식의 수로도 충분히 입체적이고 매력적인 캐릭터를 만들
        수 있습니다. 심리 도식이 많은 것은 입체적 캐릭터 메이킹에 도움이 되지만
        절대적인 변수는 아닙니다.
      </Typography>
    </Fragment>
  );
  return (
    <div className={classes.root}>
      <Box className={classes.title}>
        <Typography display="block" variant="h5">
          캐릭터의 입체도
        </Typography>
        <InfoModal title={modalTitle} content={modalContent} />
      </Box>
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

import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "asset/style/style";
import PropTypes from "prop-types";

function ButtonToAction({ title, buttonText, startIcon, inputType, onChange, onClick }) {
  const classes = useStyles();

  return (
    <Box className={classes.btaBox}>
      <Typography variant="h3">{title}</Typography>
      <Box>
        <input
          accept=".txt"
          style={{ display: "none" }}
          id="bta-button"
          type={inputType}
          onChange={onChange}
          onClick={onClick}
        />
        <label htmlFor="bta-button">
          <Button startIcon={startIcon} className={classes.uploadButton} component="span">
            {buttonText}
          </Button>
        </label>
      </Box>
    </Box>
  );
}

ButtonToAction.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  startIcon: PropTypes.element.isRequired,
  inputType: PropTypes.string.isRequired,
};

ButtonToAction.defaultProps = {
  title: "",
  onChange: null,
  onClick: null,
};

export default ButtonToAction;

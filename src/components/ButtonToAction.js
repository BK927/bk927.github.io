import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "auto",
    margin: "30px auto 30px auto",
    overflow: "auto",
    "& > .MuiTypography-root": {
      margin: theme.spacing(4),
    },
    "& > .MuiButton-root": {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      margin: "0 auto",
      borderRadius: "0.25em",
      fontSize: "1.5rem",
      transition: "all 0.3s ease-out",
    },
  },
  title: {
    wordBreak: "keep-all",
  },
  button: {
    "&&": {
      padding: theme.spacing(1.6),
      fontWeight: "600",
      fontSize: "1.2rem",
    },
  },
}));

function ButtonToAction({
  title,
  buttonText,
  startIcon,
  inputType,
  onChange,
  onClick,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {title}
      </Typography>
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
          <Button
            startIcon={startIcon}
            color="primary"
            className={classes.button}
            component="span"
            variant="contained"
          >
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

import React, { Fragment } from "react";

import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PropTypes from "prop-types";
import ReplayIcon from "@material-ui/icons/Replay";
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
            margin: theme.spacing(1),
        },
    },
}));

function ButtonToAction({ title, isGenerated, generateNew, generateBigfive, generateSchema }) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant="h4">
                {title}
            </Typography>
            <Box>
                <Button startIcon={<CheckCircleIcon />} onClick={generateNew} color="primary" className={classes.button} component="span" variant="contained">
                    새로 생성하기
                </Button>

                {isGenerated ? (
                    <Fragment>
                        {" "}
                        <Button startIcon={<ReplayIcon />} onClick={generateBigfive} color="primary" className={classes.button} component="span" variant="contained">
                            빅파이브만 재생성
                        </Button>{" "}
                        <Button startIcon={<ReplayIcon />} onClick={generateSchema} color="primary" className={classes.button} component="span" variant="contained">
                            심리도식만 재생성
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment />
                )}
            </Box>
        </Box>
    );
}

ButtonToAction.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    generateNew: PropTypes.func.isRequired,
    generateBigfive: PropTypes.func.isRequired,
    generateSchema: PropTypes.func.isRequired,
    isGenerated: PropTypes.bool.isRequired,
};

export default ButtonToAction;

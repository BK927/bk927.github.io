import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function ExtendedFab({ childrenFabs }) {
    const classes = useStyles();

    return (
        <Fab color="primary" aria-label="add" className={classes.margin}>
            <AddIcon />
        </Fab>
    );
}

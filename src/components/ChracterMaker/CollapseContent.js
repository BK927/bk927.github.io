import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Fragment } from "react";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(1.5),
        width: "100%",
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

function CollapseContent({ title, icon, content }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Fragment>
            <Button className={classes.header} onClick={handleExpandClick}>
                <Box className={classes.title}>
                    {icon}
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <ExpandMoreIcon
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                />
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {content}
            </Collapse>
        </Fragment>
    );
}

CollapseContent.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    icon: PropTypes.node.isRequired,
};

export default CollapseContent;
